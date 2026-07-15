<template>
  <UIPopup @close-popup="closePopup()">
    <form @submit.prevent="submit()" v-if="!numberLabel">
      <h2>Подать заявку</h2>
      <div class="popup__subtitle">Работа</div>
      <div class="popup__flex">
        <UIInput
          v-model="order.jobName"
          :placeholder="'Название работы'"
          :label="'Название работы:'"
          required
        />
        <UIInputSelect
          v-model="order.nomination"
          label="Номинация:"
          placeholder="Номинация"
          :options="nominations"
          required
        />
        <UIInput
          v-model="jobInfo.size"
          :label="'Размер работы:'"
          :placeholder="'Например: A2/A3/30x50см'"
          required
        />
        <UIInput
          v-model="jobInfo.matherial"
          :placeholder="'Например: Карандаш/Гуашь/Пастель/...'"
          :label="'Материал работы:'"
          required
        />
        <UIInput
          v-model="jobInfo.tecnology"
          :placeholder="'Например: Живописная/Графическая/...'"
          :label="'Техника работы:'"
          required
        />
        <UIInput
          v-model.number="jobInfo.year"
          :placeholder="'Год создания работы'"
          :label="'Год создания:'"
          :min="2011"
          :max="2026"
          required
        />
        <UIInput
          v-model="jobInfo.city"
          :placeholder="'Город создания работы'"
          :label="'Место создания:'"
          required
        />
      </div>
      <div class="popup__subtitle">Автор</div>
      <div class="popup__flex">
        <UIInput
          v-model="order.authorSurname"
          :placeholder="'Фамилия автора'"
          :label="'Фамилия автора:'"
          required
        />
        <UIInput
          v-model="order.authorName"
          :placeholder="'Имя автора'"
          :label="'Имя автора:'"
          required
        />
        <UIInput
          v-model="order.authorFathername"
          :placeholder="'Отчество автора'"
          :label="'Отчество автора:'"
          required
        />
        <UIInput
          v-model.number="order.authorOld"
          :placeholder="'Полный возраст автора'"
          :label="'Возраст автора:'"
          :min="autorMinOld"
          :max="17"
          required
        />
      </div>
      <div class="popup__subtitle">Родитель / Представитель</div>
      <div class="popup__flex">
        <UIInput
          v-model="order.representativeSurname"
          :placeholder="'Фамилия родителя'"
          :label="'Фамилия родителя:'"
          required
        />
        <UIInput
          v-model="order.representativeName"
          :placeholder="'Имя родителя'"
          :label="'Имя родителя:'"
          required
        />
        <UIInput
          v-model="order.representativeFathername"
          :placeholder="'Отчество родителя'"
          :label="'Отчество родителя:'"
          required
        />
        <UIInputPhone
          v-model="order.representativePhone"
          :placeholder="'Телефон родителя'"
          :label="'Телефон родителя:'"
          required
        />
      </div>
      <div class="popup__subtitle">Педагог</div>
      <div class="popup__flex">
        <UIInput
          v-model="order.teacherSurname"
          :placeholder="'Фамилия педагога'"
          :label="'Фамилия педагога:'"
        />
        <UIInput
          v-model="order.teacherName"
          :placeholder="'Имя педагога'"
          :label="'Имя педагога:'"
        />
        <UIInput
          v-model="order.teacherFathername"
          :placeholder="'Отчество педагога'"
          :label="'Отчество педагога:'"
        />
        <UIInputPhone
          v-model="order.teacherPhone"
          :placeholder="'Телефон педагога'"
          :label="'Телефон педагога:'"
        />
      </div>
      <div class="popup__subtitle">Учебное заведение</div>
      <UIInputTextarea
        v-model="order.school"
        :placeholder="'Полное название и адрес учебного заведения '"
        :label="'Учебное заведение:'"
        required
      />
      <div class="search__list">
        <div
          class="search__item"
          v-for="school in filteredSchools"
          :key="school"
          @click="order.school = school"
        >
          {{ school }}
        </div>
      </div>
      <div class="popup__subtitle">Черновик ярлыка</div>
      <div class="label">
        <div class="label__text">
          <p v-if="jobNameC !== ''">
            <span>Название работы:</span> {{ jobNameC }}
          </p>
          <p v-else class="error"><span>Заполните название работы;</span></p>
          <p><span>Номинация:</span> {{ jobNominatia }};</p>
          <p v-if="authorInfo !== ''"><span>Автор:</span> {{ authorInfo }}</p>
          <p v-else class="error">
            <span>Заполните всю информацию об авторе;</span>
          </p>
          <p v-if="representativeInfo !== ''">
            <span>Представитель:</span> {{ representativeInfo }}
          </p>
          <p v-else class="error">
            <span>Заполните всю информацию о предсавителе;</span>
          </p>
          <p v-if="teacherInfo !== ''">
            <span>Педагог:</span> {{ teacherInfo }}
          </p>
          <p v-else class="error">
            <span>Заполните всю информацию о педагоге;</span>
          </p>
          <p v-if="order.school !== ''">
            <span>Учебное заведение:</span> {{ order.school }}.
          </p>
          <p v-else class="error">
            <span>Заполните информацию об учебном заведении.</span>
          </p>
        </div>
        <div class="label__img">
          <NuxtImg src="/logo_beauty_full.svg" alt="logo" />
          <p><span>№ заявки регионального этапа:</span> XXX-XXX</p>
        </div>
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <UIButton :type="'submit'" :loading>Подать</UIButton>
    </form>

    <div class="successful" v-else>
      <h2>Заявка {{ numberLabel }} принята!</h2>
      <p>
        Ярлык на обратную сторону работы уже скачивается. Если скачивание не
        началось, попробуйте скачать заново.
      </p>
      <a :href="linkAgain.href" :download="linkAgain.download">
        <UIButton>Скачать заново</UIButton>
      </a>
      <p>
        Распечатайте и приклейте ярлык на обратную сторону работы, после чего,
        работу с пакетом документов отнесите на удобный для вас адрес.
      </p>
      <p>
        Результаты конкурса будут объявлены в TG и MAX каналах Горловской
        Епархии, а также на сайте ОРОиК ГЕ.
      </p>
    </div>
  </UIPopup>
</template>

<script setup lang="ts">
  import { schools, paintSchools, VSH } from '~/assets/schools';
  import Fuse from 'fuse.js';
  import { formatLabelNumber } from '~~/utils/utils';

  const order = reactive({
    jobName: '',
    nomination: '«ОСНОВНАЯ ТЕМАТИКА»',

    authorSurname: '',
    authorName: '',
    authorFathername: '',
    authorOld: 9,

    representativeSurname: '',
    representativeName: '',
    representativeFathername: '',
    representativePhone: '',

    teacherSurname: '',
    teacherName: '',
    teacherFathername: '',
    teacherPhone: '',

    school: '',
  });

  const jobInfo = reactive({
    size: '',
    matherial: '',
    tecnology: '',
    year: 2026,
    city: '',
  });

  const emit = defineEmits<{
    closePopup: [];
  }>();

  const nominations = [
    { value: '«ОСНОВНАЯ ТЕМАТИКА»', label: '«ОСНОВНАЯ ТЕМАТИКА»' },
    { value: '«РОСПИСЬ ПО ФАРФОРУ»', label: '«РОСПИСЬ ПО ФАРФОРУ»' },
  ];

  const schoolsAll: string[] = [...schools, ...paintSchools, ...VSH].map(
    (item) => item.toUpperCase(),
  );

  const jobNameC = computed(() => {
    let job = order.jobName;
    if (job[0] === '"' && job[job.length - 1] === '"') job = job.slice(1, -1);
    if (job[0] === '«' && job[job.length - 1] === '»') job = job.slice(1, -1);
    if (job[0] === "'" && job[job.length - 1] === "'") job = job.slice(1, -1);
    if (job === '') return '';
    else return `«${order.jobName}»;`;
  });
  const jobNominatia = computed(() => {
    return nominations.find((nom) => nom.value === order.nomination)?.label;
  });
  const authorInfo = computed(() => {
    if (
      order.authorSurname === '' ||
      order.authorName === '' ||
      order.authorFathername === ''
    )
      return '';
    else
      return `${order.authorSurname} ${order.authorName} ${order.authorFathername}, ${order.authorOld} лет;`;
  });
  const autorMinOld = computed(() =>
    order.nomination === '«ОСНОВНАЯ ТЕМАТИКА»' ? 9 : 13,
  );
  const representativeInfo = computed(() => {
    if (
      order.representativeSurname === '' ||
      order.representativeName === '' ||
      order.representativeFathername === '' ||
      order.representativePhone === ''
    )
      return '';
    else
      return `${order.representativeSurname} ${order.representativeName} ${order.representativeFathername}, ${order.representativePhone};`;
  });
  const teacherInfo = computed(() => {
    if (
      order.teacherSurname === '' ||
      order.teacherName === '' ||
      order.teacherFathername === '' ||
      order.teacherPhone === ''
    )
      return '';
    else
      return `${order.teacherSurname} ${order.teacherName} ${order.teacherFathername}, ${order.teacherPhone};`;
  });
  let fuse: Fuse<string> | null = null;
  onMounted(() => {
    fuse = new Fuse(schoolsAll, { useTokenSearch: true, tokenMatch: 'all' });
  });
  const filteredSchools = computed(() => {
    if (schoolsAll.includes(order.school) || order.school === '') return [];
    const query = order.school.trim();
    if (!query) {
      return schoolsAll.slice(0, 5);
    }

    if (!fuse) return [];

    const results = fuse.search(query);
    let found = results.map((result) => result.item);

    return found.slice(0, 10);
  });
  const numberLabel = ref('');

  function closePopup() {
    numberLabel.value = '';
    emit('closePopup');
  }

  watch(
    () => order.nomination,
    (newVal) => {
      if (newVal !== '«ОСНОВНАЯ ТЕМАТИКА»' && order.authorOld < 13) {
        order.authorOld = 13;
        jobInfo.size = 'А2';
      }
    },
  );

  const loading = ref(false);
  const errorMessage = ref<string | null>(null);
  const linkAgain = reactive({ href: '', download: '' });

  async function submit() {
    loading.value = true;
    errorMessage.value = null;
    try {
      const result = await $fetch('/api/beauty-2026/apply', {
        method: 'POST',
        body: { order, jobInfo },
      });
      if (!result.success) {
        throw new Error(result.message || 'Ошибка при создании заявки');
      }
      const { data, pdfBase64Label } = result;

      const binaryString = atob(pdfBase64Label);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      numberLabel.value = formatLabelNumber(data.number);

      const link = document.createElement('a');
      link.href = url;
      link.download = `label_${numberLabel.value}.pdf`;
      linkAgain.href = url;
      linkAgain.download = `label_${numberLabel.value}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // URL.revokeObjectURL(url);
    } catch (err: any) {
      if (err.data?.data) {
        errorMessage.value = err.data.data
          .map((e: any) => e.message)
          .join('; ');
      } else {
        errorMessage.value = err.message || 'Произошла ошибка при отправке';
      }
    } finally {
      loading.value = false;
    }
  }
</script>

<style scoped lang="scss">
  .popup {
    &__flex {
      display: flex;
      flex-wrap: wrap;
      gap: 5px 10px;
    }
    &__subtitle {
      margin: 10px 0 0;
      font-weight: 600;
      font-size: 1.2em;
      text-align: center;
    }
  }
  .search {
    &__list {
      width: 100%;
      max-height: 200px;
      overflow-y: auto;
      font-size: 0.7em;
    }
    &__item {
      margin: 3px 0;
      border-bottom: 1px solid var(--accent);
      cursor: pointer;
    }
  }
  .label {
    display: flex;
    max-width: 100%;

    @media screen and (width <= 768px) {
      font-size: 0.7em;
    }
    & div {
      border: 1px solid black;
    }
    &__img {
      display: flex;
      flex: 2;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 10px;
      & img {
        filter: grayscale(0.9);
      }
    }
    &__text {
      flex: 3;
      padding: 10px;
    }
    & p {
      margin: 0;
      text-align: left;
      text-indent: 0;
      & span {
        font-weight: 600;
      }
      &.error {
        color: red;
        font-size: 0.8em;
        & span {
          font-weight: 400;
        }
      }
    }
  }
  .error-message {
    margin: 10px 0;
    padding: 8px;
    color: var(--color-error-500);
    font-size: 0.9em;
    text-align: center;
    border: 1px solid var(--color-error-500);
    border-radius: var(--radius-md);
  }
  .successful {
    & p {
      font-size: 0.8em;
      text-align: center;
      text-indent: 0;
      text-wrap: balance;
    }
  }
</style>
