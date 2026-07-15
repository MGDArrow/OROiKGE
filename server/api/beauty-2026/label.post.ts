import { getRequestURL, readBody } from 'h3';
import puppeteer from 'puppeteer';

let browser: puppeteer.Browser | null = null;

async function getBrowser() {
  if (!browser) {
    let executablePath: string | undefined;
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
      executablePath =
        'C:/Program Files/Yandex/YandexBrowser/Application/browser.exe';
    } else if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    }

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ...(executablePath && { executablePath }),
    });
  }
  return browser;
}

export default defineEventHandler(async (event) => {
  const {
    authorFathername,
    authorName,
    authorOld,
    authorSurname,
    jobName,
    nomination,
    number,
    representativeFathername,
    representativeName,
    representativePhone,
    representativeSurname,
    school,
    teacherFathername,
    teacherName,
    teacherPhone,
    teacherSurname,
    size,
    matherial,
    tecnology,
    year,
    city,
  } = await readBody(event);

  const url = getRequestURL(event);
  let origin = url.origin;

  if (process.env.NODE_ENV === 'development' && origin === 'http://localhost') {
    const port = process.env.PORT || 3000;
    origin = `http://localhost:${port}`;
  }

  const reportUrl = new URL('/docs/label', origin);

  reportUrl.searchParams.set('authorFathername', authorFathername);
  reportUrl.searchParams.set('authorName', authorName);
  reportUrl.searchParams.set('authorOld', authorOld);
  reportUrl.searchParams.set('authorSurname', authorSurname);
  reportUrl.searchParams.set('jobName', jobName);
  reportUrl.searchParams.set('nomination', nomination);
  reportUrl.searchParams.set('number', number);
  reportUrl.searchParams.set(
    'representativeFathername',
    representativeFathername,
  );
  reportUrl.searchParams.set('representativeName', representativeName);
  reportUrl.searchParams.set('representativePhone', representativePhone);
  reportUrl.searchParams.set('representativeSurname', representativeSurname);
  reportUrl.searchParams.set('school', school);
  reportUrl.searchParams.set('teacherFathername', teacherFathername);
  reportUrl.searchParams.set('teacherName', teacherName);
  reportUrl.searchParams.set('teacherPhone', teacherPhone);
  reportUrl.searchParams.set('teacherSurname', teacherSurname);
  reportUrl.searchParams.set('size', size);
  reportUrl.searchParams.set('matherial', matherial);
  reportUrl.searchParams.set('tecnology', tecnology);
  reportUrl.searchParams.set('year', year);
  reportUrl.searchParams.set('city', city);

  const browserInstance = await getBrowser();
  const page = await browserInstance.newPage();

  try {
    await page.goto(reportUrl.href, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 5 });
    await page.waitForFunction(() => (window as any).reportReady === true, {
      timeout: 200,
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: false,
      printBackground: true,
    });

    return pdfBuffer;
  } finally {
    await page.close();
  }
});
