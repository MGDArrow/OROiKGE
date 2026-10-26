<template>
  <div>
    <div v-if="pending" class="admin__loading">Загрузка...</div>
    <div v-else-if="error" class="admin__error">{{ error.message }}</div>
    <div v-else>
      <div class="admin__actions">
        <p>
          Всего: {{ currentStat.pictures }}/{{ statistic.pictures }} работ,
          {{ currentStat.authors }}/{{ statistic.authors }} участников,
          {{ currentStat.schools }}/{{ statistic.schools }} учреждений,
          {{ currentStat.winners }}/{{ statistic.winners }} победителей;
        </p>
        <div class="admin__buttons">
          <UIButton @click="showAddForm = true" class="btn-add">
            Добавить работу вручную
          </UIButton>
          <UIButton @click="showModal = true" class="btn-generate">
            Сгенерировать грамоты
          </UIButton>
        </div>
      </div>
      <table class="admin__table">
        <thead>
          <tr>
            <th
              @click="sort('createdAt')"
              @contextmenu.prevent="openFilterMenu('createdAt', $event)"
              class="sortable"
            >
              Дата
              <span v-if="sortBy === 'createdAt'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
              <span v-if="isFilterActive('createdAt')" class="filter-icon"
                >🔽</span
              >
            </th>
            <th
              @click="sort('author')"
              @contextmenu.prevent="openFilterMenu('author', $event)"
              class="sortable"
            >
              Автор
              <span v-if="sortBy === 'author'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
              <span v-if="isFilterActive('author')" class="filter-icon"
                >🔽</span
              >
            </th>
            <th
              @contextmenu.prevent="openFilterMenu('jobName', $event)"
              class="sortable"
            >
              Название работы
              <span v-if="isFilterActive('jobName')" class="filter-icon"
                >🔽</span
              >
            </th>
            <th
              @click="sort('nomination')"
              @contextmenu.prevent="openFilterMenu('nomination', $event)"
              class="sortable"
            >
              Номинация
              <span v-if="sortBy === 'nomination'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
              <span v-if="isFilterActive('nomination')" class="filter-icon"
                >🔽</span
              >
            </th>
            <th
              @click="sort('representative')"
              @contextmenu.prevent="openFilterMenu('representative', $event)"
            >
              Представитель
              <span v-if="sortBy === 'representative'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
              <span v-if="isFilterActive('representative')" class="filter-icon"
                >🔽</span
              >
            </th>
            <th
              @click="sort('teacher')"
              @contextmenu.prevent="openFilterMenu('teacher', $event)"
            >
              Педагог
              <span v-if="sortBy === 'teacher'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
              <span v-if="isFilterActive('teacher')" class="filter-icon"
                >🔽</span
              >
            </th>
            <th
              @click="sort('school')"
              @contextmenu.prevent="openFilterMenu('school', $event)"
            >
              Школа
              <span v-if="sortBy === 'school'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
              <span v-if="isFilterActive('school')" class="filter-icon"
                >🔽</span
              >
            </th>
            <th
              @click="sort('place')"
              @contextmenu.prevent="openFilterMenu('place', $event)"
            >
              Место
              <span v-if="sortBy === 'place'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
              <span v-if="isFilterActive('place')" class="filter-icon">🔽</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedApplications" :key="item.id">
            <td>
              <span>
                {{ new Date(item.createdAt).toLocaleDateString('ru-RU') }}
              </span>
              {{ formatLabelNumber(item.number) }}
            </td>
            <td>
              {{ item.authorSurname }} {{ item.authorName }}
              {{ item.authorFathername }}
              <span>({{ item.authorOld }} лет)</span>
            </td>
            <td>«{{ item.jobName }}»</td>
            <td>
              <span>{{ item.nomination }}</span>
              {{ getNomination(item.nomination, item.authorOld) }}
            </td>
            <td>
              {{
                formatFio(
                  item.representativeSurname,
                  item.representativeName,
                  item.representativeFathername,
                )
              }}
              <a
                v-if="item.representativePhone"
                :href="`tel:${getPhone(item.representativePhone)}`"
                >{{ item.representativePhone }}</a
              >
            </td>
            <td>
              {{
                formatFio(
                  item.teacherSurname,
                  item.teacherName,
                  item.teacherFathername,
                )
              }}
              <a
                v-if="item.teacherPhone"
                :href="`tel:${getPhone(item.teacherPhone)}`"
                >{{ item.teacherPhone }}</a
              >
            </td>
            <td class="school-cell">{{ item.school ?? '—' }}</td>
            <td>
              <UISpinner v-if="loadingSet.has(item.id)" />
              <UIInputSelect
                v-else
                @change="() => savePlace(item, item.place)"
                :options="[
                  { label: '—', value: null },
                  { label: 'I', value: 'I' },
                  { label: 'II', value: 'II' },
                  { label: 'III', value: 'III' },
                  { label: 'Гран-При', value: 'Гран-При' },
                ]"
                v-model="item.place"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Фильтр-попап -->
      <Teleport to="body">
        <div
          v-if="filterMenu.column"
          class="filter-popup"
          :style="{
            position: 'fixed',
            top: filterMenu.y + 'px',
            left: filterMenu.x + 'px',
          }"
        >
          <div class="filter-popup__header">
            <button @click="selectAllFilter(filterMenu.column)">
              Выбрать всё
            </button>
            <button @click="clearFilter(filterMenu.column)">Снять всё</button>
          </div>
          <ul class="filter-popup__list">
            <li
              v-for="value in columnUniqueValues(filterMenu.column)"
              :key="value"
            >
              <label>
                <input
                  type="checkbox"
                  :checked="isValueChecked(filterMenu.column, value)"
                  @change="toggleFilterValue(filterMenu.column, value)"
                />
                {{ value }}
                <span class="count">
                  ({{
                    columnValueCounts.get(filterMenu.column)?.get(value) ?? 0
                  }})
                </span>
              </label>
            </li>
          </ul>
        </div>
        <UIPopup v-if="showModal" @close-popup="showModal = false">
          <h2>Загрузка шаблонов грамот</h2>
          <form @submit.prevent="uploadAndGenerate">
            <div class="file-input-group">
              <label>
                <span>Шаблон для 1–3 места (PDF, 3 страницы):</span>
                <input
                  type="file"
                  accept=".pdf"
                  @change="handleFile($event, 'places')"
                  required
                />
              </label>
              <label>
                <span>Шаблон для Гран-при (PDF):</span>
                <input
                  type="file"
                  accept=".pdf"
                  @change="handleFile($event, 'grand')"
                  required
                />
              </label>
              <label>
                <span>Шаблон для сертификата участника (PDF):</span>
                <input
                  type="file"
                  accept=".pdf"
                  @change="handleFile($event, 'sert')"
                  required
                />
              </label>
            </div>

            <div v-if="uploadError" class="error-message">
              {{ uploadError }}
            </div>

            <UIButton type="submit" :loading="generating"
              >Сгенерировать и скачать</UIButton
            >
          </form>
        </UIPopup>
        <UIPopup v-if="showAddForm" @close-popup="closeAddForm">
          <h2>Добавить работу вручную</h2>
          <form @submit.prevent="submitManual">
            <div class="popup__flex">
              <UIInput
                v-model="manualForm.authorSurname"
                label="Фамилия участника:"
                placeholder="Иванов"
                required
              />
              <UIInput
                v-model="manualForm.authorName"
                label="Имя участника:"
                placeholder="Иван"
                required
              />
              <UIInput
                v-model="manualForm.authorFathername"
                label="Отчество участника:"
                placeholder="Иванович"
                required
              />
              <UIInput
                v-model.number="manualForm.authorOld"
                label="Возраст:"
                :placeholder="'Полный возраст'"
                :min="ageRange.min"
                :max="ageRange.max"
                required
              />
            </div>
            <div class="popup__flex">
              <UIInput
                v-model="manualForm.jobName"
                label="Название работы:"
                placeholder="Моя работа"
                required
              />
              <UIInputSelect
                v-model="manualForm.nomination"
                label="Номинация:"
                :options="nominations"
                required
              />
            </div>
            <UIInputTextarea
              v-model="manualForm.school"
              label="Учебное заведение:"
              placeholder="Полное название и адрес учебного заведения"
              required
            />
            <div v-if="filteredSchools.length" class="search__list">
              <div
                v-for="school in filteredSchools"
                :key="school"
                class="search__item"
                @click="manualForm.school = school"
              >
                {{ school }}
              </div>
            </div>
            <div v-if="manualError" class="error-message">
              {{ manualError }}
            </div>
            <UIButton type="submit" :loading="manualLoading">Добавить</UIButton>
          </form>
        </UIPopup>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { BeautyII } from '~~/prisma/generated/client';
  import { formatLabelNumber } from '~~/utils/utils';
  import { SCHOOLS, DOY, PAINT, VSH } from '~/assets/schools';
  import Fuse from 'fuse.js';

  // Сортировка
  const sortBy = ref<
    | 'createdAt'
    | 'school'
    | 'place'
    | 'author'
    | 'teacher'
    | 'representative'
    | 'nomination'
  >('createdAt');
  const sortOrder = ref<'asc' | 'desc'>('desc');

  // Загрузка ВСЕХ данных без сортировки с сервера
  const { data, pending, error, refresh } = useAsyncData(
    'admin-applications',
    () => $fetch<{ data: BeautyII[] }>('/api/beauty-2026/applications'),
    {
      default: () => ({
        data: [],
        statistic: {
          pictures: 0,
          authors: 0,
          schools: 0,
          winners: 0,
        },
      }),
    },
  );

  // Список всех школ (в верхнем регистре, как в форме на странице конкурса)
  const schoolsAll: string[] = [...SCHOOLS, ...PAINT, ...DOY, ...VSH].map(
    (item) => item.toUpperCase(),
  );

  let fuse: Fuse<string> | null = null;

  onMounted(() => {
    fuse = new Fuse(schoolsAll, { useTokenSearch: true, tokenMatch: 'all' });
  });

  const filteredSchools = computed(() => {
    if (schoolsAll.includes(manualForm.school) || manualForm.school === '')
      return [];
    const query = manualForm.school.trim();
    if (!query) return schoolsAll.slice(0, 5);
    if (!fuse) return [];
    return fuse
      .search(query)
      .map((r) => r.item)
      .slice(0, 10);
  });

  const applications = computed(() => data.value?.data ?? []);
  const statistic = computed(
    () =>
      data.value?.statistic ?? {
        pictures: 0,
        authors: 0,
        schools: 0,
        winners: 0,
      },
  );
  const currentStat = computed(() => {
    const authors = new Set();
    const schools = new Set();
    sortedApplications.value.forEach((el) => {
      authors.add(
        `${el.authorSurname} ${el.authorName} ${el.authorFathername} ${el.authorOld}`,
      );
      if (el.school) schools.add(el.school);
    });

    return {
      pictures: sortedApplications.value.length,
      authors: authors.size,
      schools: schools.size,
      winners: sortedApplications.value.filter((el) => el.place !== null)
        .length,
    };
  });

  // === Фильтры ===
  type ColumnKey =
    | 'createdAt'
    | 'author'
    | 'jobName'
    | 'nomination'
    | 'representative'
    | 'teacher'
    | 'school'
    | 'place';

  const activeFilters = reactive<Partial<Record<ColumnKey, Set<string>>>>({});

  // Получить отображаемое значение для столбца
  function getColumnValue(item: BeautyII, column: ColumnKey): string {
    switch (column) {
      case 'createdAt':
        return new Date(item.createdAt).toLocaleDateString('ru-RU');
      case 'author':
        return `${item.authorSurname} ${item.authorName} ${item.authorFathername}`;
      case 'jobName':
        return item.jobName;
      case 'nomination': {
        const age = item.authorOld;
        const suffix =
          item.nomination === '«РОСПИСЬ ПО ФАРФОРУ»'
            ? ''
            : age < 13
              ? ' (9–12 лет)'
              : ' (13–17 лет)';
        return item.nomination + suffix;
      }
      case 'representative':
        return formatFio(
          item.representativeSurname,
          item.representativeName,
          item.representativeFathername,
        );
      case 'teacher':
        return formatFio(
          item.teacherSurname,
          item.teacherName,
          item.teacherFathername,
        );
      case 'school':
        return item.school;
      case 'place':
        return item.place ?? '—';
      default:
        return '';
    }
  }

  // Уникальные значения для столбца (на основе всех данных)
  const allUniqueValues = computed(() => {
    const map = new Map<ColumnKey, string[]>();
    const keys: ColumnKey[] = [
      'createdAt',
      'author',
      'jobName',
      'nomination',
      'representative',
      'teacher',
      'school',
      'place',
    ];
    for (const key of keys) {
      const values = new Set<string>();
      for (const item of applications.value) {
        values.add(getColumnValue(item, key));
      }
      map.set(
        key,
        [...values].sort((a, b) => a.localeCompare(b)),
      );
    }
    return map;
  });

  const columnValueCounts = computed(() => {
    const map = new Map<ColumnKey, Map<string, number>>();
    const keys: ColumnKey[] = [
      'createdAt',
      'author',
      'jobName',
      'nomination',
      'representative',
      'teacher',
      'school',
      'place',
    ];
    for (const key of keys) {
      const counts = new Map<string, number>();
      for (const item of applications.value) {
        const val = getColumnValue(item, key);
        counts.set(val, (counts.get(val) || 0) + 1);
      }
      map.set(key, counts);
    }
    return map;
  });

  function columnUniqueValues(column: ColumnKey): string[] {
    return allUniqueValues.value.get(column) ?? [];
  }

  function isFilterActive(column: ColumnKey): boolean {
    const filter = activeFilters[column];
    if (!filter) return false;
    const total = columnUniqueValues(column).length;
    return filter.size > 0 && filter.size < total;
  }

  function isValueChecked(column: ColumnKey, value: string): boolean {
    return activeFilters[column]?.has(value) ?? true; // если Set нет, то всё выбрано (true)
  }

  function toggleFilterValue(column: ColumnKey, value: string) {
    if (!activeFilters[column]) {
      // Инициализируем: изначально всё выбрано, поэтому создаём Set всех значений
      const all = new Set(columnUniqueValues(column));
      activeFilters[column] = all;
    }
    const set = activeFilters[column]!;
    if (set.has(value)) {
      set.delete(value);
    } else {
      set.add(value);
    }
    // Реактивность Set требует замены, если не используется reactive Set
    activeFilters[column] = new Set(set); // триггерим реактивность
  }

  function selectAllFilter(column: ColumnKey) {
    // Удаляем фильтр – это эквивалентно «все выбраны»
    delete activeFilters[column];
  }

  function clearFilter(column: ColumnKey) {
    activeFilters[column] = new Set(); // пустой Set – ничего не выбрано
  }

  // Применяем фильтры к данным
  const filteredApplications = computed(() => {
    let result = applications.value;
    const keys = Object.keys(activeFilters) as ColumnKey[];
    for (const column of keys) {
      const filterSet = activeFilters[column];
      if (!filterSet) continue; // нет фильтра – пропускаем
      const total = columnUniqueValues(column).length;
      if (filterSet.size === 0) {
        // ничего не выбрано – скрываем все строки
        return [];
      }
      if (filterSet.size === total) {
        // выбраны все – фильтр не активен, пропускаем
        continue;
      }
      result = result.filter((item) => {
        const val = getColumnValue(item, column);
        return filterSet.has(val);
      });
    }
    return result;
  });

  // === Сортировка на клиенте ===
  const placeOrder: Record<string, number> = {
    'Гран-При': 1,
    'I': 2,
    'II': 3,
    'III': 4,
    '—': 5,
  };

  function compareByColumn(
    a: BeautyII,
    b: BeautyII,
    column: typeof sortBy.value,
  ): number {
    const order = sortOrder.value === 'asc' ? 1 : -1;

    const getVal = (item: BeautyII) => {
      switch (column) {
        case 'createdAt':
          return new Date(item.createdAt).getTime();
        case 'school':
          return item.school;
        case 'place':
          return placeOrder[item.place ?? '—'];
        case 'author':
          return `${item.authorSurname} ${item.authorName} ${item.authorFathername}`;
        case 'teacher':
          return formatFio(
            item.teacherSurname,
            item.teacherName,
            item.teacherFathername,
          );
        case 'representative':
          return formatFio(
            item.representativeSurname,
            item.representativeName,
            item.representativeFathername,
          );
        case 'nomination':
          return (
            item.nomination + getNomination(item.nomination, item.authorOld)
          );
        default:
          return 0;
      }
    };

    const aVal = getVal(a);
    const bVal = getVal(b);

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * order;
    }
    if (aVal < bVal) return -1 * order;
    if (aVal > bVal) return 1 * order;
    return 0;
  }

  const sortedApplications = computed(() => {
    return [...filteredApplications.value].sort((a, b) =>
      compareByColumn(a, b, sortBy.value),
    );
  });

  function sort(field: typeof sortBy.value) {
    if (sortBy.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy.value = field;
      sortOrder.value = 'asc';
    }
  }

  function getNomination(nomination: string, age: number) {
    if (nomination === '«РОСПИСЬ ПО ФАРФОРУ»') return '';
    return age < 13 ? `(9–12 лет)` : '(13–17 лет)';
  }

  function getPhone(phone: string | null | undefined): string {
    if (!phone) return '';
    return phone.replace(/[-+()\s]/g, '');
  }

  function formatFio(
    surname?: string | null,
    name?: string | null,
    fathername?: string | null,
  ): string {
    const parts = [surname, name, fathername].filter(
      (p): p is string => !!p && p.trim() !== '',
    );
    return parts.length ? parts.join(' ') : '—';
  }

  // === Работа с местами ===
  const loadingSet = ref(new Set());

  async function savePlace(item: BeautyII, newPlace: string | null) {
    loadingSet.value.add(item.id);
    try {
      await $fetch(`/api/beauty-2026/${item.id}`, {
        method: 'PATCH',
        body: { place: newPlace },
      });
      item.place = newPlace;
    } catch (err) {
      console.error('Ошибка сохранения места', err);
      alert('Не удалось сохранить место');
    } finally {
      loadingSet.value.delete(item.id);
    }
  }

  if (error.value) {
    throw createError({ statusCode: 500, message: 'Ошибка загрузки данных' });
  }

  // === Контекстное меню фильтра ===
  const filterMenu = reactive<{
    column: ColumnKey | null;
    x: number;
    y: number;
  }>({
    column: null,
    x: 0,
    y: 0,
  });

  function openFilterMenu(column: ColumnKey, event: MouseEvent) {
    filterMenu.column = column;
    filterMenu.x = event.clientX;
    filterMenu.y = event.clientY;
  }

  function closeFilterMenu() {
    filterMenu.column = null;
  }

  // Закрытие при клике вне попапа и по Escape
  function onDocumentClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.filter-popup') && !target.closest('th')) {
      closeFilterMenu();
    }
  }

  function onEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') closeFilterMenu();
  }

  const showModal = ref(false);
  const generating = ref(false);
  const uploadError = ref<string | null>(null);

  // Хранилище загруженных файлов (объект: имя поля -> File)
  const uploadedFiles = ref<Record<string, File>>({});

  function handleFile(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      uploadedFiles.value[fieldName] = input.files[0];
    }
  }

  async function uploadAndGenerate() {
    if (
      !uploadedFiles.value.places ||
      !uploadedFiles.value.grand ||
      !uploadedFiles.value.sert
    ) {
      uploadError.value = 'Загрузите все три шаблона';
      return;
    }

    generating.value = true;
    uploadError.value = null;

    try {
      const formData = new FormData();
      formData.append('places', uploadedFiles.value.places);
      formData.append('grand', uploadedFiles.value.grand);
      formData.append('sert', uploadedFiles.value.sert);

      const response = await fetch('/api/beauty-2026/generate-certificates', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Ошибка генерации');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificates_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Закрываем модалку
      showModal.value = false;
      uploadedFiles.value = {};
    } catch (err: any) {
      uploadError.value = err.message;
    } finally {
      generating.value = false;
    }
  }

  onMounted(() => {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onEscape);
  });

  onUnmounted(() => {
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscape);
  });

  // === Ручное добавление работы ===
  const showAddForm = ref(false);
  const manualLoading = ref(false);
  const manualError = ref<string | null>(null);

  const nominations = [
    { value: '«КРАСОТА ГЛАЗАМИ РЕБЁНКА»', label: '«КРАСОТА ГЛАЗАМИ РЕБЁНКА»' },
    { value: '«ОСНОВНАЯ ТЕМАТИКА»', label: '«ОСНОВНАЯ ТЕМАТИКА»' },
    { value: '«РОСПИСЬ ПО ФАРФОРУ»', label: '«РОСПИСЬ ПО ФАРФОРУ»' },
  ];

  const defaultManualForm = {
    authorSurname: '',
    authorName: '',
    authorFathername: '',
    authorOld: 9,
    jobName: '',
    nomination: '«ОСНОВНАЯ ТЕМАТИКА»',
    school: '',
  };

  const manualForm = reactive({ ...defaultManualForm });

  const ageRange = computed(() => {
    switch (manualForm.nomination) {
      case '«КРАСОТА ГЛАЗАМИ РЕБЁНКА»':
        return { min: 5, max: 8 };
      case '«РОСПИСЬ ПО ФАРФОРУ»':
        return { min: 13, max: 17 };
      default:
        return { min: 9, max: 17 };
    }
  });

  watch(
    () => manualForm.nomination,
    () => {
      if (manualForm.authorOld < ageRange.value.min)
        manualForm.authorOld = ageRange.value.min;
      if (manualForm.authorOld > ageRange.value.max)
        manualForm.authorOld = ageRange.value.max;
    },
  );

  function closeAddForm() {
    showAddForm.value = false;
    Object.assign(manualForm, defaultManualForm);
    manualError.value = null;
  }

  async function submitManual() {
    manualLoading.value = true;
    manualError.value = null;
    try {
      await $fetch('/api/beauty-2026/manual-add', {
        method: 'POST',
        body: manualForm,
      });
      closeAddForm();
      await refresh();
    } catch (err: any) {
      if (err.data?.data) {
        manualError.value = err.data.data.map((e: any) => e.message).join('; ');
      } else {
        manualError.value = err.message || 'Ошибка при добавлении';
      }
    } finally {
      manualLoading.value = false;
    }
  }
</script>

<style scoped lang="scss">
  table {
    font-size: 0.7em;
    border-collapse: separate;
    border-spacing: 3px 0.8em;
    & tr {
      & th {
        position: relative;
        min-width: max-content;
        padding: 0.3em 0.1em;
        color: var(--color-white);
        font-weight: 600;
        vertical-align: middle;
        background: var(--accent);
        cursor: pointer;
        user-select: none;
        .filter-icon {
          margin-left: 4px;
          color: #ffe066;
          font-size: 0.8em;
        }
      }
      & td {
        vertical-align: middle;
        &:nth-child(1) {
          font-size: 1.1em;
          text-align: center;
          & span {
            font-weight: 600;
            font-size: 0.75em;
          }
        }
        &:nth-child(2) {
          font-weight: 600;
          & span {
            font-weight: 300;
            font-style: italic;
          }
        }
        &:nth-child(3) {
          font-weight: 600;
          text-align: center;
        }
        &:nth-child(4) {
          text-align: center;
          & span {
            display: block;
            font-weight: 600;
          }
        }
        &:nth-child(5),
        &:nth-child(6) {
          & a {
            display: block;
            color: var(--color-black);
            font-style: italic;
            text-decoration: none;
          }
        }
        &:nth-child(7) {
          font-size: 0.9em;
        }
      }
    }
    /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
    :deep(.ui-input) {
      min-width: max-content;
    }
  }

  /* Стили попапа фильтра */
  .filter-popup {
    z-index: 1000;
    min-width: 200px;
    max-height: 300px;
    overflow-y: auto;
    font-size: 0.8rem;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
    &__header {
      display: flex;
      justify-content: space-between;
      padding: 4px 8px;
      border-bottom: 1px solid #eee;
      button {
        padding: 2px 6px;
        color: var(--accent);
        font-size: 0.75rem;
        background: none;
        border: none;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    &__list {
      margin: 0;
      padding: 4px 8px;
      list-style: none;
      li {
        margin: 2px 0;
        label {
          display: flex;
          gap: 4px;
          align-items: center;
          cursor: pointer;
        }
      }
    }
  }
  .admin__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .btn-generate {
    width: auto;
    padding: 8px 20px;
    font-size: 0.9em;
  }
  .file-input-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 16px 0;
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-weight: 500;
      span {
        font-size: 0.9rem;
      }
      input[type='file'] {
        padding: 6px;
        background: #f9f9f9;
        border: 2px solid var(--accent);
      }
    }
  }
  .error-message {
    margin: 8px 0;
    color: var(--red);
  }
  .admin__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }
  .btn-add {
    width: auto;
    padding: 8px 20px;
    font-size: 0.9em;
  }
  .popup__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 5px 10px;
    margin-bottom: 10px;
  }
  .search {
    &__list {
      width: 100%;
      max-height: 200px;
      margin-bottom: 10px;
      overflow-y: auto;
      font-size: 0.7em;
      border: 2px solid var(--accent);
      border-top: none;
    }
    &__item {
      padding: 4px 8px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      &:hover {
        color: var(--color-white);
        background: var(--accent);
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
</style>
