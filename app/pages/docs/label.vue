<template>
  <div class="wrapper">
    <div class="a4">
      <div class="label">
        <div class="label__text">
          <p><span>Название работы:</span> «{{ jobName }}»</p>
          <p><span>Номинация:</span> {{ nomination }};</p>
          <p>
            <span>Автор:</span> {{ authorSurname }} {{ authorName }}
            {{ authorFathername }}, {{ authorOld }} лет;
          </p>
          <p>
            <span>Представитель:</span> {{ representativeSurname }}
            {{ representativeName }} {{ representativeFathername }},
            {{ representativePhone }};
          </p>
          <p>
            <span>Педагог:</span> {{ teacherSurname }} {{ teacherName }}
            {{ teacherFathername }}, {{ teacherPhone }};
          </p>
          <p><span>Учебное заведение:</span> {{ school }}.</p>
        </div>
        <div class="label__img">
          <NuxtImg src="/logo_beauty_full.svg" alt="logo" />
          <p>
            <span>№ заявки регионального этапа:</span>
            {{ formatLabelNumber(number) }}
          </p>
          <p><span>Дата подачи заявки:</span> {{ formattedDate }}</p>
        </div>
      </div>
    </div>
    <div class="a4">
      <div class="personal-data">
        <h1>СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ</h1>
        <div class="flex">
          <div>г. Горловка</div>
          <div>{{ formattedDate }} г.</div>
        </div>

        <p>
          Я,
          <b
            >{{ representativeSurname }} {{ representativeName }}
            {{ representativeFathername }}</b
          >,«___»_______ ______г.р.
        </p>
        <p>
          Паспорт, серия: _____, номер: ________, дата выдачи: «___»_______
          _____г., выдан: ________________________________, код подразделения:
          ________, проживающий(ая) по адресу:
          _____________________________________________, не возражаю против
          обработки в Синодальном отделе религиозного образования и катехизации
          Русской Православной Церкви, 109044, г. Москва, ул. Мельникова, д. 7,
          тел. +7(495)650-10-70 (включая получение от меня и/или от любых
          третьих лиц, с учетом требований действующего законодательства
          Российской Федерации) персональных данных моего ребенка,
          <b
            >{{ nameGenitive.last }} {{ nameGenitive.first }}
            {{ nameGenitive.middle }}</b
          >.
        </p>
        <p>Документ удостоверяющий личность ребёнка:</p>
        <ul>
          <li>
            Паспорт. Серия: _____, номер: ________, дата выдачи: «___»_________
            _____г., выдан: ________________________________, код подразделения:
            ________;
          </li>
          <li>
            Свидетельство о рождении. Серия: ___, номер: ______, дата выдачи:
            «__»____ ___г., выдан:
            _____________________________________________________________.
          </li>
        </ul>
        <p>
          Согласие дается мною, поскольку мой ребенок,
          <b>{{ authorSurname }} {{ authorName }} {{ authorFathername }}</b
          >, участвует в Международном конкурсе детского творчества «Красота
          Божьего мира», проводимом Синодальным отделом религиозного образования
          и катехизации Русской Православной Церкви и Автономной некоммерческой
          организацией «Центр образовательных и культурных инициатив
          «ПОКОЛЕНИЕ».
        </p>
        <p>
          Персональные данные, предоставленные мною Синодальному отделу
          религиозного образования и катехизации Русской Православной Церкви,
          включают в себя в том числе (но не ограничиваясь) мои фамилию, имя,
          отчество; год, месяц, дату и место рождения; адрес, семейное,
          имущественное, социальное положение; паспортные данные; образование,
          профессию; доходы, а также все иные персональные данные, относящиеся к
          моей личности, доступные либо известные в любой конкретный момент
          времени Синодальному отделу религиозного образования и катехизации
          Русской Православной Церкви (далее – персональные данные).
        </p>
        <p>
          Настоящее согласие предоставляется на осуществление любых действий в
          отношении моих персональных данных, включая без ограничения: сбор,
          систематизацию, накопление, хранение, уточнение (обновление,
          изменение), использование, распространение (в том числе передача),
          обезличивание, блокирование, уничтожение, трансграничную передачу
          персональных данных, а также осуществление любых иных действий с моими
          персональными данными с учетом действующего законодательства.
        </p>
        <p>
          Обработка персональных данных осуществляется Синодальным отделом
          религиозного образования и катехизации Русской Православной Церкви с
          применением следующих основных способов (но не ограничиваясь ими):
          хранение, запись на электронные носители и их хранение, передача в
          Оргкомитет Конкурса.
        </p>
        <p>
          Настоящее согласие дается до истечения сроков хранения соответствующей
          информации или документов, содержащих вышеуказанную информацию,
          определяемых в соответствии с законодательством Российской Федерации.
          Отзыв настоящего согласия может быть произведен в письменной форме
          путем направления мною соответствующего письменного уведомления
          Синодальному отделу религиозного образования и катехизации Русской
          Православной Церкви не менее чем за 3 (три) месяца до момента отзыва
          согласия.
        </p>
        <p></p>
        <div class="flex">
          <div>{{ formattedDate }} г.</div>
          <div>
            <div>________________________________</div>
            <div class="small">подпись и расшифровка</div>
          </div>
        </div>
      </div>
    </div>
    <div class="a4">
      <div class="personal-data">
        <h1>
          СОГЛАСИЕ ЗАКОННОГО ПРЕДСТАВИТЕЛЯ НА ПЕРЕДАЧУ ИСКЛЮЧИТЕЛЬНЫХ АВТОРСКИХ
          ПРАВ НА ТВОРЧЕСКУЮ РАБОТУ
        </h1>
        <div class="flex">
          <div>г. Горловка</div>
          <div>{{ formattedDate }} г.</div>
        </div>

        <p>
          Я,
          <b
            >{{ representativeSurname }} {{ representativeName }}
            {{ representativeFathername }}</b
          >,«___»_______ ______г.р.
        </p>
        <p>
          Паспорт, серия: _____, номер: ________, дата выдачи: «___»_______
          _____г., выдан: ________________________________, код подразделения:
          ________, проживающий(ая) по адресу:
          _____________________________________________, как законный
          представитель
          <b
            >{{ nameGenitive.last }} {{ nameGenitive.first }}
            {{ nameGenitive.middle }}</b
          >, на основании:
        </p>
        <p>
          cвидетельства о рождении, серия: ___, номер: ______, дата выдачи:
          «__»____ ___г., выдан:
          _____________________________________________________________.
        </p>
        <p>
          _____________________________________________________________________
        </p>
        <p class="small">
          (или иной документ, подтверждающий, что субъект является законным
          представителем подопечного)
        </p>
        <p>
          настоящим даю свое согласие на передачу исключительных авторских прав
          на творческую работу:
        </p>

        <ul>
          <li>
            – название работы / <b>«{{ jobName }}»</b> /
          </li>
          <li>– размер / {{ size }} /</li>
          <li>– материал / {{ matherial }} /</li>
          <li>– техника / {{ tecnology }} /</li>
          <li>– год создания / {{ year }} /</li>
          <li>– место создания / {{ city }} /</li>
          <li>
            – автор /
            <b>{{ authorSurname }} {{ authorName }} {{ authorFathername }}</b> /
          </li>
        </ul>
        <p>
          автономной некоммерческой организации «Центр образовательных и
          культурных инициатив «ПОКОЛЕНИЕ», г. Москва, ул. Петровка, д. 28/2,
          тел./факс: +7(495)628-19-05.
        </p>
        <p>
          Я даю свое согласие на использование исключительных авторских прав на
          творческую работу своего подопечного в целях участия данной творческой
          работы в Международном конкурсе детского творчества «Красота Божьего
          мира».
        </p>
        <p>
          Я подтверждаю, что, давая такое Согласие, я действую по собственной
          воле и в интересах своего подопечного.
        </p>
        <p></p>
        <div class="flex">
          <div>{{ formattedDate }} г.</div>
          <div>
            <div>________________________________</div>
            <div class="small">подпись и расшифровка</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { formatLabelNumber } from '../../../utils/utils';
  import { incline } from 'lvovich';
  definePageMeta({
    layout: 'print-a4',
  });

  const route = useRoute();

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
  } = route.query as Record<string, string>;

  const formattedDate = computed(() => {
    return new Date().toLocaleDateString('ru-RU');
  });

  const nameGenitive = incline(
    { first: authorName, middle: authorFathername, last: authorSurname },
    'genitive',
  );

  onMounted(() => {
    window.reportReady = true;
  });
</script>

<style scoped lang="scss">
  .a4 {
    width: 210mm;
    height: 297mm;
    padding: 10mm;
    border: 1px solid black;
  }
  .label {
    display: flex;
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
      font-size: 0.6em;
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
    }
  }
  .personal-data {
    width: 100%;
    padding: 0.5cm 0.5cm 0.5cm 1.5cm;
    font-size: 11pt;
    & h1 {
      margin: 0;
      font-weight: 600;
      font-size: 12pt;
    }
    & .flex {
      display: flex;
      gap: 1cm;
      align-items: center;
      margin: 0.5cm 0 0.3em;
      & > div {
        flex: 1;
        &:last-child {
          text-align: right;
        }
      }
    }
    & p {
      margin: 0.1cm 0;
    }
    & b {
      font-weight: 600;
    }
    ul {
      & li {
        font-size: inherit;
        text-indent: 1.5em;
        list-style-type: none;
        &::before {
          position: absolute;
          width: 0.5em;
          height: 0.5em;
          background: transparent;
          border: 0.4px solid black;
          transform: translateX(-1em) translateY(80%);
          content: ' ';
        }
      }
    }
    & .small {
      font-size: 0.8em;
      text-align: center;
    }
  }
</style>
