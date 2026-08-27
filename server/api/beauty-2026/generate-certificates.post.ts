import { defineEventHandler, readMultipartFormData, createError } from 'h3';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { ZipArchive } from 'archiver';
import fs from 'fs-extra';
import path from 'path';
import { incline } from 'lvovich';
import prisma from '~~/utils/prisma';

const CONFIG = {
  rect: {
    left: 30,
    top: 378.61,
    right: 565.27,
    bottom: 423,
  },
  // Новый прямоугольник для Гран-При
  rectGrand: {
    left: 30,
    top: 573,
    right: 565.27,
    bottom: 632,
  },
  fontSize: 58,
  minFontSize: 30,
  colors: {
    gold: '#d8b541',
    silver: '#a8a8a8',
    copper: '#e36f0c',
    diamond: '#3cbbd0',
  },
  fontPath: path.resolve(process.cwd(), 'public/fonts/SPSL-New-Cyrillic.ttf'),
};

// дополнительные прямоугольники для грамот за места
const RECT_NAME_PLACE = {
  left: 30,
  top: 325.59,
  right: 565.27,
  bottom: 382.46,
};
const RECT_PLACE_TEXT = {
  left: 188.23,
  top: 416.91,
  right: 407,
  bottom: 456.74,
};
const RECT_NOMINATION_TEXT = {
  left: 71.29,
  top: 483.59,
  right: 523.9,
  bottom: 526.46,
};

// Для I, II, III используем одну и ту же страницу (0), но разные цвета
const PLACE_CONFIG = {
  'I': { pageIndex: 0, color: CONFIG.colors.gold },
  'II': { pageIndex: 0, color: CONFIG.colors.silver },
  'III': { pageIndex: 0, color: CONFIG.colors.copper },
  'Гран-При': { template: 'grand', color: CONFIG.colors.diamond },
};

function hexToRgb(hex: string) {
  const clean = hex.replace(/^#/, '');
  return {
    r: parseInt(clean.substring(0, 2), 16) / 255,
    g: parseInt(clean.substring(2, 4), 16) / 255,
    b: parseInt(clean.substring(4, 6), 16) / 255,
  };
}

// Возвращает дательное склонение ФИО в формате "Фамилия Имя" (без отчества)
function getDeclinedNameWithoutPatronymic(
  surname: string,
  name: string,
  fathername: string,
): string {
  try {
    const result = incline(
      { first: name, middle: fathername, last: surname },
      'dative',
    );
    return `${result.last} ${result.first}`.trim();
  } catch {
    return `${surname} ${name}`.trim();
  }
}

// Возвращает именительный падеж "Фамилия Имя" (без отчества)
function getNominativeNameWithoutPatronymic(
  surname: string,
  name: string,
): string {
  return `${surname} ${name}`.trim();
}

function findOptimalFontSize(text: string, font: any, maxWidth: number) {
  let size = CONFIG.fontSize;
  while (size >= CONFIG.minFontSize) {
    if (font.widthOfTextAtSize(text, size) <= maxWidth) return size;
    size -= 1;
  }
  return CONFIG.minFontSize;
}

export default defineEventHandler(async (event) => {
  // 1. Получаем загруженные файлы
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, message: 'Файлы не загружены' });
  }

  const files: Record<string, Buffer> = {};
  for (const part of formData) {
    if (part.name && part.data) {
      files[part.name] = part.data;
    }
  }

  const required = ['places', 'grand', 'sert'];
  for (const key of required) {
    if (!files[key]) {
      throw createError({
        statusCode: 400,
        message: `Не загружен файл: ${key}`,
      });
    }
  }

  // 2. Валидация PDF-файлов (проверка наличия хотя бы одной страницы)
  let placesDoc, grandDoc, sertDoc;
  try {
    placesDoc = await PDFDocument.load(files.places);
    if (placesDoc.getPageCount() < 1) {
      throw new Error('Файл places.pdf должен содержать хотя бы одну страницу');
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      message: `Ошибка в places.pdf: ${e.message}`,
    });
  }

  try {
    grandDoc = await PDFDocument.load(files.grand);
    if (grandDoc.getPageCount() < 1) {
      throw new Error('Файл grand.pdf должен содержать хотя бы одну страницу');
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      message: `Ошибка в grand.pdf: ${e.message}`,
    });
  }

  try {
    sertDoc = await PDFDocument.load(files.sert);
    if (sertDoc.getPageCount() < 1) {
      throw new Error('Файл sert.pdf должен содержать хотя бы одну страницу');
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      message: `Ошибка в sert.pdf: ${e.message}`,
    });
  }

  // 3. Загружаем шрифт
  let fontBytes: Buffer;
  try {
    fontBytes = await fs.readFile(CONFIG.fontPath);
  } catch {
    throw createError({
      statusCode: 500,
      message: 'Шрифт SPSL-New-Cyrillic не найден',
    });
  }

  // 4. Получаем данные из БД
  const applications = await prisma.beautyII.findMany();
  const winners = applications.filter((a) => a.place !== null);
  const participants = applications.filter((a) => a.place === null);

  if (!winners.length && !participants.length) {
    throw createError({ statusCode: 404, message: 'Нет данных для генерации' });
  }

  // 5. Создаём временные папки
  const tmpDir = path.resolve(process.cwd(), 'tmp', `certs-${Date.now()}`);
  await fs.ensureDir(tmpDir);

  // Структуры для хранения файлов и check-строк по категориям
  const categoryFiles: Record<string, string[]> = {
    grands: [],
    I: [],
    II: [],
    III: [],
    serts: [],
  };
  const checkLines: Record<string, string[]> = {
    grands: [],
    I: [],
    II: [],
    III: [],
    serts: [],
  };

  // Вспомогательная функция для генерации одного PDF
  async function generatePdf(
    templatePdfBytes: Buffer,
    pageIndex: number,
    nameToDraw: string,
    colorHex: string,
    outputPath: string,
    place?: string | null,
    nomination?: string | null,
    rectOverride?: typeof CONFIG.rect, // новый параметр
  ) {
    const templatePdf = await PDFDocument.load(templatePdfBytes);
    const pageCount = templatePdf.getPageCount();
    if (pageIndex >= pageCount) {
      throw new Error(
        `Запрошенная страница ${pageIndex} не существует (всего ${pageCount} страниц)`,
      );
    }

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const [page] = await pdfDoc.copyPages(templatePdf, [pageIndex]);
    pdfDoc.addPage(page);

    const font = await pdfDoc.embedFont(fontBytes);
    const pageHeight = page.getHeight();

    // Определяем прямоугольник для имени
    let rectName;
    if (rectOverride) {
      rectName = rectOverride;
    } else if (place && ['I', 'II', 'III'].includes(place)) {
      rectName = RECT_NAME_PLACE;
    } else {
      rectName = CONFIG.rect;
    }

    // Рисуем имя
    const {
      left: nameLeft,
      top: nameTop,
      right: nameRight,
      bottom: nameBottom,
    } = rectName;
    const nameWidth = nameRight - nameLeft;
    const optSizeName = findOptimalFontSize(nameToDraw, font, nameWidth);
    const textWidthName = font.widthOfTextAtSize(nameToDraw, optSizeName);
    const xName = nameLeft + (nameWidth - textWidthName) / 2;
    const centerYName = (nameTop + nameBottom) / 2;
    const yName = pageHeight - centerYName - optSizeName / 2;

    const { r, g, b } = hexToRgb(colorHex);
    page.drawText(nameToDraw, {
      x: xName,
      y: yName,
      size: optSizeName,
      font,
      color: rgb(r, g, b),
    });

    // Если это место (I, II, III) и есть номинация – рисуем дополнительные тексты
    if (place && ['I', 'II', 'III'].includes(place) && nomination) {
      // 1. Текст места (например, "I МЕСТО") — фиксированный размер 40
      const placeText = `${place} МЕСТО`;
      const placeRect = RECT_PLACE_TEXT;
      const placeWidth = placeRect.right - placeRect.left;
      const placeFontSize = 40;
      const textWidthPlace = font.widthOfTextAtSize(placeText, placeFontSize);
      const xPlace = placeRect.left + (placeWidth - textWidthPlace) / 2;
      const centerYPlace = (placeRect.top + placeRect.bottom) / 2;
      const yPlace = pageHeight - centerYPlace - placeFontSize / 2;
      page.drawText(placeText, {
        x: xPlace,
        y: yPlace,
        size: placeFontSize,
        font,
        color: rgb(r, g, b),
      });

      // 2. Название номинации (в верхнем регистре) — фиксированный размер 34
      const nomText = nomination.toUpperCase();
      const nomRect = RECT_NOMINATION_TEXT;
      const nomWidth = nomRect.right - nomRect.left;
      const nomFontSize = 34;
      const textWidthNom = font.widthOfTextAtSize(nomText, nomFontSize);
      const xNom = nomRect.left + (nomWidth - textWidthNom) / 2;
      const centerYNom = (nomRect.top + nomRect.bottom) / 2;
      const yNom = pageHeight - centerYNom - nomFontSize / 2;
      page.drawText(nomText, {
        x: xNom,
        y: yNom,
        size: nomFontSize,
        font,
        color: rgb(r, g, b),
      });
    }

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);
  }

  // 6. Генерация для победителей
  for (const app of winners) {
    const category =
      app.place === 'Гран-При' ? 'grands' : (app.place as string);
    if (!category || !['grands', 'I', 'II', 'III'].includes(category)) {
      console.warn(`Неизвестное место: ${app.place}, пропускаем`);
      continue;
    }

    const declinedName = getDeclinedNameWithoutPatronymic(
      app.authorSurname,
      app.authorName,
      app.authorFathername,
    ).toUpperCase();

    const nominativeName = getNominativeNameWithoutPatronymic(
      app.authorSurname,
      app.authorName,
    );

    const fileName = `${category}_${app.authorSurname}_${app.authorName}.pdf`;
    const outputPath = path.join(tmpDir, fileName);

    let templateBuffer: Buffer;
    let pageIndex: number;
    let colorHex: string;
    let placeParam: string | null = null;
    let nominationParam: string | null = null;
    let rectOverride: typeof CONFIG.rect | undefined = undefined;

    if (app.place === 'Гран-При') {
      templateBuffer = files.grand;
      pageIndex = 0;
      colorHex = PLACE_CONFIG['Гран-При'].color;
      placeParam = null;
      nominationParam = null;
      // Используем специальный прямоугольник для Гран-При
      rectOverride = CONFIG.rectGrand;
    } else if (app.place === 'I' || app.place === 'II' || app.place === 'III') {
      templateBuffer = files.places;
      pageIndex = PLACE_CONFIG[app.place].pageIndex;
      colorHex = PLACE_CONFIG[app.place].color;
      placeParam = app.place;
      nominationParam = app.nomination;
      rectOverride = undefined; // используем стандартную логику
    } else {
      continue;
    }

    await generatePdf(
      templateBuffer,
      pageIndex,
      declinedName,
      colorHex,
      outputPath,
      placeParam,
      nominationParam,
      rectOverride,
    );

    categoryFiles[category].push(outputPath);
    checkLines[category].push(`${nominativeName} — ${declinedName}`);
  }

  // 7. Генерация для участников (сертификаты)
  for (const app of participants) {
    const declinedName = getDeclinedNameWithoutPatronymic(
      app.authorSurname,
      app.authorName,
      app.authorFathername,
    ).toUpperCase();

    const nominativeName = getNominativeNameWithoutPatronymic(
      app.authorSurname,
      app.authorName,
    );

    const fileName = `sert_${app.authorSurname}_${app.authorName}.pdf`;
    const outputPath = path.join(tmpDir, fileName);

    await generatePdf(
      files.sert,
      0,
      declinedName,
      CONFIG.colors.gold,
      outputPath,
      null,
      null,
      undefined, // без переопределения
    );

    categoryFiles['serts'].push(outputPath);
    checkLines['serts'].push(`${nominativeName} — ${declinedName}`);
  }

  // 8. Создание check-файлов в папке checks
  const checksDir = path.join(tmpDir, 'checks');
  await fs.ensureDir(checksDir);

  for (const [category, lines] of Object.entries(checkLines)) {
    if (lines.length === 0) continue;
    const checkFilePath = path.join(checksDir, `${category}_check.txt`);
    await fs.writeFile(checkFilePath, lines.join('\n'), 'utf-8');
  }

  // 9. Создание объединённых PDF для каждой категории
  async function mergePdfs(pdfPaths: string[], outputPath: string) {
    if (!pdfPaths.length) return;
    const merged = await PDFDocument.create();
    for (const p of pdfPaths) {
      const bytes = await fs.readFile(p);
      const doc = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach((page) => merged.addPage(page));
    }
    const mergedBytes = await merged.save();
    await fs.writeFile(outputPath, mergedBytes);
  }

  const categoryMergeMap: Record<string, string> = {
    grands: 'GRANDS.pdf',
    I: 'I.pdf',
    II: 'II.pdf',
    III: 'III.pdf',
    serts: 'SERTS.pdf',
  };

  for (const [category, filesList] of Object.entries(categoryFiles)) {
    if (filesList.length === 0) continue;
    const mergeFileName = categoryMergeMap[category];
    if (!mergeFileName) continue;
    const mergePath = path.join(tmpDir, mergeFileName);
    await mergePdfs(filesList, mergePath);
  }

  // 10. Создание ZIP-архива с нужной структурой
  const zipPath = path.join(tmpDir, 'certificates.zip');
  const output = fs.createWriteStream(zipPath);
  const archive = new ZipArchive({ zlib: { level: 9 } });

  await new Promise(async (resolve, reject) => {
    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);

    for (const [category, filesList] of Object.entries(categoryFiles)) {
      if (filesList.length === 0) continue;
      const folderName = category;
      for (const filePath of filesList) {
        const baseName = path.basename(filePath);
        archive.file(filePath, { name: path.join(folderName, baseName) });
      }
    }

    archive.directory(checksDir, 'checks');

    for (const [category, mergeName] of Object.entries(categoryMergeMap)) {
      const mergePath = path.join(tmpDir, mergeName);
      if (await fs.pathExists(mergePath)) {
        archive.file(mergePath, { name: mergeName });
      }
    }

    archive.finalize();
  });

  // 11. Отправка архива
  const zipBuffer = await fs.readFile(zipPath);
  fs.remove(tmpDir).catch(console.error);

  setResponseHeaders(event, {
    'Content-Type': 'application/zip',
    'Content-Disposition': `attachment; filename="certificates_${Date.now()}.zip"`,
  });
  return zipBuffer;
});
