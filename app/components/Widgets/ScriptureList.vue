<template>
  <div>
    <h3 style="text-align: center; text-indent: 0">
      <strong>Реестр библейских групп Горловской Епархии</strong>
    </h3>
    <UISwitch :buttons v-model="button" />
    <div class="registry">
      <div class="registry__item" v-if="button === 'Горловка'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_1.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong
              >Воскресная школа для взрослых при Богоявленском кафедральном
              соборе</strong
            >
          </h4>
          <UIList>
            <li><strong>Адрес: </strong>г. Горловка, Соборная площадь, д.1;</li>
            <li>
              <strong>Время занятий: </strong>воскресенье, после Литургии (около
              10:00);
            </li>
            <li>
              <strong>Ведущий: </strong>архимандрит Агафодор (Поляков),
              протоиерей Димитрий Абросимов;
            </li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79495208117">+7 (949) 520-81-17</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Горловка'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_2.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong
              >Библейская группа «Воскресная школа для взрослых»
              Свято-Николаевского архиерейского собора города Горловка</strong
            >
          </h4>
          <UIList>
            <li><strong>Адрес: </strong>г. Горловка, ул. Вострухина, д. 2;</li>
            <li>
              <strong>Время занятий: </strong>воскресенье, после Литургии (около
              10:00);
            </li>
            <li><strong>Ведущий: </strong>протоиерей Николай (Зирка);</li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79495208117">+7 (949) 520-81-17</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Енакиево'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_3.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong
              >Библейская группа «Изучение Священного Писания» Свято-Покровского
              собора города Енакиево</strong
            >
          </h4>
          <UIList>
            <li>
              <strong>Адрес: </strong>г. Енакиево, просп. Металлургов, 21/68;
            </li>
            <li>
              <strong>Время занятий: </strong>воскресенье, после Литургии (около
              10:00); понедельник 10:00 — для глухонемых;
            </li>
            <li>
              <strong>Ведущий: </strong>протоиерей Сергий Фоменко — воскресенье;
              иерей Николай Соколов — понедельник, для глухонемых;
            </li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79493115122">+7 (949) 311-51-22</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Горловка'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_4.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong
              >Библейская группа «Воскресная школа для взрослых» Благовещенского
              храма города Горловка</strong
            >
          </h4>
          <UIList>
            <li><strong>Адрес: </strong>г. Горловка, пр-кт Ленина, д. 190;</li>
            <li>
              <strong>Время занятий: </strong>воскресенье, после Литургии (около
              11:00);
            </li>
            <li><strong>Ведущий: </strong>протоиерей Александр Пеканов;</li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79493621797">+7 (949) 362-17-97</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Горловка'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_5.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong
              >Библейская группа храма святой Марии Магдалины города
              Горловка</strong
            >
          </h4>
          <UIList>
            <li>
              <strong>Адрес: </strong>г. Горловка, ул. Кореневского, д. 12А;
            </li>
            <li>
              <strong>Время занятий: </strong>воскресенье, после Литургии (около
              10:00);
            </li>
            <li><strong>Ведущий: </strong>протоиерей Александр Александров;</li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79493308557">+7 (949) 330-85-57</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Горловка'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_6.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong>Библейская группа при храме Рождества Богородицы</strong>
          </h4>
          <UIList>
            <li><strong>Адрес: </strong>г. Горловка, улица Богуна, 43;</li>
            <li>
              <strong>Время занятий: </strong>раз в месяц, в территориальном
              центре социального обслуживания;
            </li>
            <li><strong>Ведущий: </strong>протоиерей Иоанн Дворянов;</li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79493209909">+7 (949) 320-99-09</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Енакиево'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_7.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong
              >Библейская группа Вознесенского храма посёлка Корсунь</strong
            >
          </h4>
          <UIList>
            <li>
              <strong>Адрес: </strong>пос. Корсунь г. Енакиево, ул. Клубная, 4;
            </li>
            <li>
              <strong>Время занятий: </strong>воскресенье, после Литургии (около
              10:00);
            </li>
            <li><strong>Ведущий: </strong>иерей Николай Соколов;</li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79493115122">+7 (949) 311-51-22</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Горловка'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_8.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong
              >Библейская группа при храме святителя Василия Великого</strong
            >
          </h4>
          <UIList>
            <li>
              <strong>Адрес: </strong>г. Горловка, пос. Кондратьевка, ул.
              Вересаева, 16;
            </li>
            <li>
              <strong>Время занятий: </strong>воскресенье, после Литургии (около
              10:00);
            </li>
            <li><strong>Ведущий: </strong>иерей Димитрий Бекмансуров;</li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79493921639">+7 (949) 392-16-39</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Шахтёрск'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_9.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong
              >Библейская группа при храме иконы Божией Матери «Неупиваемая
              Чаша»</strong
            >
          </h4>
          <UIList>
            <li><strong>Адрес: </strong>г. Шахтёрск, ул. 60 лет октября, 5;</li>
            <li>
              <strong>Время занятий: </strong>воскресенье, после Литургии (около
              10:00);
            </li>
            <li><strong>Ведущий: </strong>протоиерей Антоний Антонян;</li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79493844292">+7 (949) 384-42-92</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Горловка'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_10.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong
              >Библейская группа при храме Спаса Нерукотворного Образа</strong
            >
          </h4>
          <UIList>
            <li>
              <strong>Адрес: </strong>г. Горловка, ул. Горловской дивизии, 103;
            </li>
            <li>
              <strong>Время занятий: </strong>воскресенье, после Литургии (около
              10:00);
            </li>
            <li><strong>Ведущий: </strong>архимандрит Тихон (Кондрашов);</li>
            <li>
              <strong>Телефон: </strong>
              <a href="tel:79493497035">+7 (949) 349-70-35</a>.
            </li>
          </UIList>
        </div>
      </div>
      <div class="registry__item" v-if="button === 'Енакиево'">
        <NuxtImg
          src="https://s3.regru.cloud/opk-info/ppip/templ_11.webp"
          alt="photo"
        />
        <div class="info">
          <h4>
            <strong>Библейская группа при Андреевском храме</strong>
          </h4>
          <UIList>
            <li><strong>Адрес: </strong>г. Ждановка, ул. Школьная, 3а;</li>
            <li><strong>Время занятий: </strong>среда, 17:00;</li>
            <li><strong>Ведущий: </strong>протоиерей Алексий Пахомов;</li>
            <!-- <li>
              <strong>Телефон: </strong>
              <a href="tel:79493497035">+7 (949) 349-70-35</a>.
            </li> -->
          </UIList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const button = ref('Горловка');
  const buttons = ['Горловка', 'Енакиево', 'Шахтёрск'];
</script>

<style scoped lang="scss">
  .registry {
    &__item {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      border-bottom: 2px solid var(--accent);
      & > div {
        flex: 1;
      }
      & h4 {
        text-align: center;
      }
      &:nth-child(2n) {
        flex-direction: row-reverse;
      }

      @media (width <= 768px) {
        flex-direction: column;
        gap: 10px;
        align-items: center;
        border-bottom: none;
        &:nth-child(2n) {
          flex-direction: column;
        }
      }
    }
    & img {
      width: 300px;
      border: 2px solid var(--accent);
    }
    & ul li {
      margin: 0;
      text-indent: 0;
      &::before {
        display: none;
      }
    }
  }
</style>
