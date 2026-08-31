<template>
  <div>
    <article>
      <h2>Об отделе</h2>
      <figure class="photo">
        <NuxtImg
          src="/mitropolit.webp"
          alt="Митрофан, митрополит Горловский и Славянский"
        />
        <figcaption>Митрофан, митрополит Горловский и Славянский</figcaption>
        <figcaption>
          <span>Упаравляющий Горловской Епархией</span>
        </figcaption>
      </figure>
      <figure class="photo right">
        <NuxtImg
          src="/evgenij.webp"
          alt="Евгений, митрополит Екатеринбургский и Верхотурский"
        />
        <figcaption>
          Евгений, митрополит Екатеринбургский и Верхотурский
        </figcaption>
        <figcaption>
          <span
            >Председатель Синодального Отдела Религиозного Образования и
            Катехизации</span
          >
        </figcaption>
      </figure>

      <p>
        В структуре каждой епархии Русской Православной Церкви существуют
        епархиальные отделы, призванные координировать церковную деятельность в
        различных направлениях. Одним из ключевых является Епархиальный отдел
        религиозного образования и катехизации (ЕОРОиК).
      </p>

      <p>
        Это структурное подразделение, действующее под непосредственным
        руководством правящего архиерея, призвано быть связующим звеном между
        церковным образованием, государственными образовательными стандартами и
        запросами общества. Его работа направлена на духовно-нравственное
        становление личности, воцерковление новоначальных и профессиональную
        подготовку педагогов.
      </p>

      <figure class="photo">
        <NuxtImg src="/manager.webp" alt="протоиерей Кирилл Щевелев" />
        <figcaption>Протоиерей Кирилл Щевелев</figcaption>
        <figcaption>
          <span
            >Руководитель Отдела Религиозного Образования и Катехизации
            Горловской Епархии</span
          >
        </figcaption>
      </figure>
      <p>
        Главной задачей Отдела Религиозного Образования Горловской Епархии
        является духовно-нравственное воспитание детей дошкольного и школьного
        возраста в духе православной веры, истории православия и православной
        культуры.
      </p>

      <p>
        Это духовно-нравственное воспитание происходит в сотрудничестве с
        государственными образовательными учебными заведениями. В частности, это
        сотрудничество заключается в организации модуля «Основы Православной
        Культуры» к уроку «Основы Религиозной Культуры и Светской Этики».
      </p>

      <p>
        Также отдел выступает региональной площадкой для проведения ежегодных
        конкурсов детского и юношеского творчества, таких как «Красота Божьего
        мира» (изобразительное искусство, графика, живопись), «Пасхальное яйцо»
        (декоративно-прикладное творчество). Эти мероприятия стимулируют у детей
        и взрослых тягу к прекрасному, помогают через художественный образ
        осмыслить православное вероучение, традиции и праздники.
      </p>
    </article>
    <h2>Основы Православной Культуры</h2>
    <div class="menu">
      <NuxtLink to="/opk-for-teacher" class="menu__item">
        <span>Материалы для учителей</span>
      </NuxtLink>
      <NuxtLink to="/opk-for-student" class="menu__item">
        <span>Материалы для учеников</span>
      </NuxtLink>
      <NuxtLink to="/opk-for-parents" class="menu__item">
        <span>Информация для родителей</span>
      </NuxtLink>
    </div>
    <h2>Конкурсы</h2>
    <div class="menu">
      <NuxtLink to="/beauty-of-gods-world" class="menu__item">
        <NuxtImg src="/logo_beauty.svg" alt="logo" loading="lazy" />
        <span>Красота Божьего Мира</span>
      </NuxtLink>
      <NuxtLink to="/easter-egg" class="menu__item">
        <NuxtImg src="/logo_egg.svg" alt="logo" loading="lazy" />
        <span>Пасхальное яйцо</span>
      </NuxtLink>
      <NuxtLink to="/summer-of-lord" class="menu__item">
        <NuxtImg src="/logo_summer.svg" alt="logo" loading="lazy" />
        <span>Лето Господне</span>
      </NuxtLink>
    </div>
    <h2>Класс Духовного Пения</h2>
    <div class="menu">
      <NuxtLink to="/klass-duhovnogo-peniya" class="menu__item">
        <span>Класс Духовного Пения</span>
      </NuxtLink>
    </div>
    <h2>Катехизация (Воцерковление)</h2>
    <div class="menu">
      <NuxtLink to="/baptism" class="menu__item">
        <span>Подготовка к Крещению</span>
      </NuxtLink>
      <NuxtLink to="/wedding" class="menu__item">
        <span>Подготовка к Венчанию</span>
      </NuxtLink>
      <NuxtLink
        to="/study-of-scripture"
        class="menu__item"
        style="--accent: var(--gold)"
      >
        <span>Изучение Писания</span>
      </NuxtLink>
      <NuxtLink to="/liturgy" class="menu__item" style="--accent: var(--green)">
        <span>Миссионерская Божественная Литургия</span>
      </NuxtLink>
    </div>
    <a
      href="https://pravobraz.ru/informaciya-ob-otdele/obshhaya-informaciya/"
      class="organization-competition"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>Общие сведения о Синодальном ОРОиК</div>
      <div>
        <NuxtImg
          src="/logo_soroik.png"
          alt="Синодальный Отдел Религиозного Образования и Катехизации"
        />
      </div>
    </a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .photo {
    display: block;
    float: left;
    width: 25%;
    margin: 0 1.5em 0.5em 0.5em;
    padding: 0.5em 0.2em;
    border: 4px solid var(--accent);
    border-radius: 10px;
    & img {
      display: block;

      // max-width: 95%;
      width: 95%;
      margin: 0 auto 0.3em;
      border-radius: 10px;
    }
    & figcaption {
      flex-wrap: balance;
      color: var(--accent);
      font-weight: 600;
      font-size: 0.8em;
      text-align: center;
    }
    & span {
      display: block;
      font-weight: 400;
      font-size: 0.9em;
    }
  }
  .right {
    float: right;
    margin: 0 0.5em 0.5em 1.5em;
  }
  p {
    margin: 15px 0;
  }

  @media (width <= 1200px) {
    .photo {
      // margin-left: 1.5em;
    }
    p {
      margin: 0;
    }
  }

  @media (width <= 768px) {
    .photo {
      float: none;
      width: 100%;
      margin: 0 0 1em;
      & img {
        width: auto;
        max-width: 95%;
      }
    }
  }
  article {
    width: 90%;
    margin: 0 auto;

    @media (width <= 768px) {
      width: 100%;
    }
  }
  .menu {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 90%;
    margin: 20px auto;
    &__item {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 1em 3em;
      color: var(--accent);
      font-weight: 600;
      font-size: 1.2em;
      text-align: center;
      text-decoration: none;
      text-wrap: balance;
      border: 0.4em solid var(--accent);
      cursor: pointer;
      & * {
        display: block;
        width: 100%;
      }
      &:nth-child(2) {
        --accent: var(--red);
      }
      &:nth-child(3) {
        --accent: var(--green);
      }
    }

    @media (width <= 1200px) {
      flex-wrap: wrap;
      width: 100%;
      &__item {
        border: 0.5em solid var(--accent);
      }
    }
  }
</style>
