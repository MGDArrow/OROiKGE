<template>
  <UIPopup @close-popup="emit('closePopup')">
    <form @submit.prevent="submit()">
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
          required
        />
        <UIInput
          v-model="order.teacherName"
          :placeholder="'Имя педагога'"
          :label="'Имя педагога:'"
          required
        />
        <UIInput
          v-model="order.teacherFathername"
          :placeholder="'Отчество педагога'"
          :label="'Отчество педагога:'"
          required
        />
        <UIInputPhone
          v-model="order.teacherPhone"
          :placeholder="'Телефон педагога'"
          :label="'Телефон педагога:'"
          required
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
      <UIButton :type="'submit'">Подать</UIButton>
    </form>
  </UIPopup>
</template>

<script setup lang="ts">
  import { schools, paintSchools, VSH } from '~/assets/schools';
  import Fuse from 'fuse.js';

  const order = reactive({
    jobName: '',
    nomination: 'main',

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

  const emit = defineEmits<{
    closePopup: [];
  }>();

  const nominations = [
    { value: 'main', label: '«ОСНОВНАЯ ТЕМАТИКА»' },
    { value: 'porcelain', label: '«РОСПИСЬ ПО ФАРФОРУ»' },
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
  const autorMinOld = computed(() => (order.nomination === 'main' ? 9 : 13));
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

  watch(
    () => order.nomination,
    (newVal) => {
      if (newVal !== 'main' && order.authorOld < 13) {
        order.authorOld = 13;
      }
    },
  );

  const loading = ref(false);
  function submit() {
    loading.value = true;
    try {
      console.log(order);
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  //   function validForm() {
  //     if (order.jobName === '') return false;
  //     if (order.authorFathername === '') return false;
  //     if (order.authorName === '') return false;
  //     if (order.authorSurname === '') return false;
  //     if (
  //       order.authorOld < 9 ||
  //       order.authorOld > 17 ||
  //       (order.authorOld < 13 && order.nomination !== 'main')
  //     )
  //       return false;
  //     if (order.representativeFathername === '') return false;
  //     if (order.representativeName === '') return false;
  //     if (order.representativeSurname === '') return false;
  //     if (order.representativePhone === '') return false;
  //     if (order.teacherFathername === '') return false;
  //     if (order.teacherName === '') return false;
  //     if (order.teacherSurname === '') return false;
  //     if (order.teacherPhone === '') return false;
  //     if (order.school === '') return false;
  //     return true;
  //   }
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
</style>
