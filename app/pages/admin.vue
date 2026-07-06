<template>
  <div class="admin">
    <h2 class="admin__title">Административная панель</h2>

    <div v-if="pending" class="admin__loading">Загрузка...</div>
    <div v-else-if="error" class="admin__error">{{ error.message }}</div>
    <div v-else>
      <table class="admin__table">
        <thead>
          <tr>
            <th @click="sort('createdAt')" class="sortable">
              Дата
              <span v-if="sortBy === 'createdAt'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
            </th>
            <th @click="sort('author')" class="sortable">
              Автор
              <span v-if="sortBy === 'author'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
            </th>

            <th>Название работы</th>
            <th @click="sort('nomination')" class="sortable">
              Номинация
              <span v-if="sortBy === 'nomination'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
            </th>
            <th @click="sort('representative')">
              Представитель
              <span v-if="sortBy === 'representative'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
            </th>
            <th @click="sort('teacher')">
              Педагог
              <span v-if="sortBy === 'teacher'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
            </th>
            <th @click="sort('school')">
              Школа
              <span v-if="sortBy === 'school'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
            </th>
            <th @click="sort('place')">
              Место
              <span v-if="sortBy === 'place'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in applications" :key="item.id">
            <td>
              <span>
                {{ new Date(item.createdAt).toLocaleDateString('ru-RU') }}</span
              >
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
              {{ item.representativeSurname }} {{ item.representativeName }}
              {{ item.representativeFathername }}
              <a :href="`tel:${getPhone(item.representativePhone)}`">{{
                item.representativePhone
              }}</a>
            </td>
            <td>
              {{ item.teacherSurname }} {{ item.teacherName }}
              {{ item.teacherFathername }}

              <a :href="`tel:${getPhone(item.teacherPhone)}`">{{
                item.teacherPhone
              }}</a>
            </td>
            <td class="school-cell">{{ item.school }}</td>
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { BeautyII } from '~~/prisma/generated/client';
  import { formatLabelNumber } from '~~/utils/utils';

  definePageMeta({
    middleware: 'auth',
    ssr: false,
  });

  // Состояние сортировки и пагинации
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

  // Загрузка данных с сервера (фильтры удалены)
  const { data, pending, error, refresh } = useAsyncData(
    'admin-applications',
    async () => {
      const params = new URLSearchParams({
        sortBy: sortBy.value,
        sortOrder: sortOrder.value,
      });
      return $fetch<{
        data: BeautyII[];
      }>(`/api/admin/applications?${params.toString()}`);
    },
    {
      watch: [sortBy, sortOrder],
      default: () => ({ data: [] }),
    },
  );

  const applications = computed(() => data.value?.data ?? []);

  // Сортировка
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

  function getPhone(phone: string) {
    return phone.replace(/[-+()\s]/g, '');
  }

  const loadingSet = ref(new Set());

  async function savePlace(item: BeautyII, newPlace: string | null) {
    loadingSet.value.add(item.id);
    try {
      await $fetch(`/api/admin/applications/${item.id}/place`, {
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
</script>

<style scoped lang="scss">
  table {
    font-size: 0.7em;
    border-collapse: separate;
    border-spacing: 3px 0.8em;
    & tr {
      & th {
        padding: 0.3em 0.1em;
        color: var(--color-white);
        font-weight: 600;
        vertical-align: middle;
        background: var(--accent);
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
</style>
