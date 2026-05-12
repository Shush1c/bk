<template>
  <div class="home-page">

    <!-- HERO -->
    <section class="hero">
      <h1>Ставки на шахматы нового уровня</h1>
      <p>
        Следи за крупнейшими турнирами мира,
        анализируй партии и делай ставки
        на лучшие шахматные матчи
      </p>

      <div class="hero-buttons">
        <router-link to="/bookmaker" class="hero-btn primary">
          Перейти к ставкам
        </router-link>

        <router-link to="/registration" class="hero-btn secondary">
          Начать сейчас
        </router-link>
      </div>
    </section>

    <!-- Что есть на сайте -->
    <section class="features">
      <h2>Что есть на сайте</h2>

      <div class="cards">
        <div class="card">
          <h3>♞ Шахматы</h3>
          <p>
            Правила, турниры, лучшие игроки мира
            и предстоящие матчи
          </p>
        </div>

        <div class="card">
          <h3>💸 Букмекерская контора</h3>
          <p>
            Ставки на шахматные матчи
            с актуальными коэффициентами
          </p>
        </div>

        <div class="card">
          <h3>🛡 Личный кабинет</h3>
          <p>
            Баланс, история ставок
            и управление профилем
          </p>
        </div>
      </div>
    </section>

    <!-- Почему выбирают нас -->
    <section class="advantages">
      <h2>Почему выбирают нас</h2>

      <div class="cards">
        <div class="card">
          <h3>⚡ Быстрые ставки</h3>
          <p>
            Оформление ставок за секунды
            без лишних действий
          </p>
        </div>

        <div class="card special-card">
          <h3>📈 Высокие коэффициенты</h3>
          <p>
            Лучшие коэффициенты на крупнейшие
            шахматные турниры
          </p>
        </div>

        <div class="card">
          <h3>🔒 Безопасность</h3>
          <p>
            Надёжный личный кабинет
            и защищённый баланс
          </p>
        </div>
      </div>
    </section>

    <!-- Популярные турниры -->
    <section class="tournaments">
      <h2>Популярные турниры</h2>

      <div class="cards">
        <div class="card">
          <h3>World Chess Championship</h3>
          <p>
            Главный турнир
            за звание чемпиона мира
          </p>
        </div>

        <div class="card">
          <h3>Grand Chess Tour</h3>
          <p>
            Серия крупнейших
            международных турниров
          </p>
        </div>

        <div class="card">
          <h3>Candidates Tournament</h3>
          <p>
            Отбор на матч
            за мировую шахматную корону
          </p>
        </div>
      </div>
    </section>

    <!-- Отзывы игроков -->
    <section class="reviews">
      <h2>Отзывы игроков</h2>

      <div class="cards">
        <div class="card">
          <p>
            “Поставил 3 000 на матч Карлсен — Накамура
            в турнире Grand Chess Tour и выиграл 8 400.
            Всё быстро и без проблем.”
          </p>
          <h3>— Андрей</h3>
        </div>

        <div class="card">
          <p>
            “Сделал ставку на Candidates Tournament,
            коэффициент был отличный. Выигрыш составил
            12 500. Очень удобный личный кабинет.”
          </p>
          <h3>— Максим</h3>
        </div>

        <div class="card">
          <p>
            “Ставил на матч Непомнящий — Дин Лижэнь
            и получил 6 700 выигрыша.
            Лучший сайт именно для шахматных ставок.”
          </p>
          <h3>— Виталий</h3>
        </div>
      </div>
    </section>

    <!-- Финальный CTA -->
    <section class="final-cta">
      <div class="cta-box">
        <h2>Готов сделать первую ставку?</h2>
        <p>
          Перейди в букмекерский раздел
          и выбери матч для своей первой ставки
        </p>

        <router-link to="/bookmaker" class="cta-btn">
          Перейти в БК
        </router-link>
      </div>
    </section>

  </div>
</template>

<style scoped>

/* Основной контейнер страницы */

.home-page {
  max-width: 1200px;
  margin: 0 auto;
}


/* HERO секция */

.hero {
  background: linear-gradient(135deg, #111, #2b2b2b);
  color: white;
  padding: 80px 40px;
  border-radius: 24px;
  text-align: center;
  margin-bottom: 60px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.25);
}

.hero h1 {
  font-size: 54px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 22px;
  max-width: 800px;
  margin: 0 auto 35px;
  color: #ddd;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-btn {
  padding: 16px 30px;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 800;
  transition: 0.2s;
}

.hero-btn.primary {
  background: #f4c430;
  color: black;
}

.hero-btn.secondary {
  background: #111;
  color: white;
}

.hero-btn:hover,
.cta-btn:hover {
  transform: translateY(-2px) scale(1.02);
}


/* Общие стили секций */

section {
  margin-bottom: 70px;
}

section h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 30px;
  width: 100%;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}


/* Общие карточки */

.card {
  background: black;
  color: white;
  padding: 28px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(255,255,255,0.08);
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card h3 {
  margin-bottom: 15px;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  width: 100%;
}

.card p {
  color: #ccc;
  line-height: 1.6;
  text-align: center;
}


/* Блок "Что есть на сайте" */

.features .card {
  min-height: 190px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.features .card h3 {
  font-size: 20px;
  margin-top: -8px;
  margin-bottom: 12px;
}

.features .card p {
  font-size: 16px;
  line-height: 1.5;
}


/* Блок преимуществ */

.advantages .card {
  min-height: 190px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.advantages .card h3 {
  font-size: 20px;
  margin-top: -8px;
  margin-bottom: 12px;
}

.advantages .card p {
  font-size: 16px;
  line-height: 1.5;
}


/* Центральная карточка */

.special-card h3 {
  font-size: 20px;
  margin-top: -8px;
}


/* Блок турниров */

.tournaments .card {
  min-height: 190px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tournaments .card h3 {
  font-size: 18px;
  margin-top: -8px;
  margin-bottom: 12px;
}

.tournaments .card p {
  font-size: 16px;
  line-height: 1.5;
}


/* Блок отзывов */

.reviews .card {
  min-height: 280px;
}

.reviews .card p {
  font-style: italic;
  margin-bottom: 20px;
}

.reviews .card h3 {
  color: #f4c430;
  font-size: 18px;
  text-align: center;
  justify-content: center;
  width: 100%;
}


/* Финальный блок */

.cta-box {
  background: linear-gradient(135deg, #111, #1f1f1f);
  padding: 60px 40px;
  border-radius: 24px;
  text-align: center;
  color: white;
  transition: 0.3s;
}

.cta-box:hover {
  transform: translateY(-4px);
}

.cta-box h2 {
  font-size: 42px;
  margin-bottom: 20px;
}

.cta-box p {
  font-size: 20px;
  color: #ddd;
  max-width: 700px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.cta-btn {
  display: inline-block;
  padding: 18px 34px;
  background: #f4c430;
  color: black;
  text-decoration: none;
  font-weight: 800;
  border-radius: 14px;
  transition: 0.2s;
  box-shadow: 0 10px 30px rgba(244,196,48,0.25);
}

</style>