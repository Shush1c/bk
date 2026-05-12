<template>
  <div class="chess-container">
    <!-- Информация о шахматах -->
    <section class="info-section">
      <h1>Шахматы в букмекерской конторе</h1>
      <div class="info-content">
        <p>Шахматы — одна из древнейших интеллектуальных игр, которая сегодня стала популярным объектом для ставок. 
        Профессиональные шахматисты участвуют в престижных турнирах с крупными призовыми фондами, что привлекает внимание букмекеров.</p>
        <p>В нашей букмекерской конторе вы можете делать ставки на исходы матчей, тоталы партий, победу белыми/черными и многие другие рынки.</p>
      </div>
    </section>

    <!-- Правила шахмат -->
    <section class="rules-section">
      <h2>Основные правила шахмат</h2>
      <div class="rules-grid">
        <div class="rule-card">
          <h3>Цель игры</h3>
          <p>Поставить мат королю соперника - ситуацию, когда король находится под ударом и не может уйти.</p>
        </div>
        <div class="rule-card">
          <h3>Фигуры</h3>
          <p>Король, Ферзь, Ладья, Слон, Конь, Пешка. Каждая фигура имеет свои уникальные ходы.</p>
        </div>
        <div class="rule-card">
          <h3>Время</h3>
          <p>В профессиональных турнирах используется контроль времени: классика, быстрые шахматы (рапид) и блиц.</p>
        </div>
        <div class="rule-card">
          <h3>Специальные правила</h3>
          <p>Рокировка, взятие на проходе, превращение пешки - особые ходы, которые нужно знать.</p>
        </div>
      </div>
    </section>

    <!-- Список турниров -->
    <section class="tournaments-section">
      <h2>Актуальные турниры</h2>
      <div class="tournaments-list">
        <div v-for="tournament in tournaments" :key="tournament.id" class="tournament-card">
          <h3>{{ tournament.name }}</h3>
          <div class="tournament-info">
            <p><strong>Даты:</strong> {{ tournament.dates }}</p>
            <p><strong>Место:</strong> {{ tournament.location }}</p>
            <p><strong>Призовой фонд:</strong> {{ tournament.prize }}</p>
            <p><strong>Статус:</strong> 
              <span :class="['status', tournament.status]">{{ getStatusText(tournament.status) }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Список игроков -->
    <section class="players-section">
      <h2>Топ-игроки</h2>
      <div class="players-list">
        <div v-for="player in players" :key="player.id" class="player-card">
          <div class="player-rating">{{ player.rating }}</div>
          <h3>{{ player.name }}</h3>
          <p>{{ player.country }}</p>
          <div class="player-stats">
            <span>Побед: {{ player.wins }}</span>
            <span>Поражений: {{ player.losses }}</span>
            <span>Ничьих: {{ player.draws }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Карточки матчей -->
    <section class="matches-section">
      <h2>Предстоящие матчи</h2>
      <div class="matches-list">
        <!-- Матч 1: ZywOo vs s1mple -->
        <div class="match-card">
          <div class="match-header">
            <span class="tournament-name">CHESS MASTERS 2024</span>
            <span class="match-date">25 ноября 2024, 19:00</span>
          </div>
          <div class="match-players">
            <div class="player">
              <span class="player-name">ZywOo</span>
              <span class="player-rating-badge">Рейтинг: 2780</span>
            </div>
            <div class="vs">VS</div>
            <div class="player">
              <span class="player-name">s1mple</span>
              <span class="player-rating-badge">Рейтинг: 2795</span>
            </div>
          </div>
          <div class="match-coefficients">
            <div class="coefficient">
              <span>Победа ZywOo (П1)</span>
              <strong>1.75</strong>
            </div>
            <div class="coefficient">
              <span>Ничья (X)</span>
              <strong>3.20</strong>
            </div>
            <div class="coefficient">
              <span>Победа s1mple (П2)</span>
              <strong>2.10</strong>
            </div>
          </div>
          <button @click="goToBookmaker('ZywOo', 's1mple', 1.75, 3.20, 2.10)" class="bet-btn">
            Сделать ставку
          </button>
        </div>

        <!-- Матч 2: deko vs shush1k -->
        <div class="match-card">
          <div class="match-header">
            <span class="tournament-name">CHESS CHAMPIONSHIP 2024</span>
            <span class="match-date">26 ноября 2024, 20:30</span>
          </div>
          <div class="match-players">
            <div class="player">
              <span class="player-name">deko</span>
              <span class="player-rating-badge">Рейтинг: 2650</span>
            </div>
            <div class="vs">VS</div>
            <div class="player">
              <span class="player-name">shush1k</span>
              <span class="player-rating-badge">Рейтинг: 2855</span>
            </div>
          </div>
          <div class="match-coefficients">
            <div class="coefficient">
              <span>Победа deko (П1)</span>
              <strong>15.00</strong>
            </div>
            <div class="coefficient">
              <span>Ничья (X)</span>
              <strong>10.00</strong>
            </div>
            <div class="coefficient">
              <span>Победа shush1k (П2)</span>
              <strong>1.01</strong>
            </div>
          </div>
          <button @click="goToBookmaker('deko', 'shush1k', 15.00, 10.00, 1.01)" class="bet-btn">
            Сделать ставку
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useusers from '../composables/useusers'

const router = useRouter()
const userStore = useusers()

// Данные о турнирах
const tournaments = ref([
  {
    id: 1,
    name: 'Чемпионат мира по шахматам 2024',
    dates: '15-30 ноября 2024',
    location: 'Сингапур',
    prize: '2 500 000 €',
    status: 'upcoming'
  },
  {
    id: 2,
    name: 'Grand Chess Tour 2024',
    dates: '5-20 декабря 2024',
    location: 'Лондон',
    prize: '1 500 000 €',
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'Шахматный Кубок Мира',
    dates: '1-15 января 2025',
    location: 'Баку',
    prize: '1 800 000 €',
    status: 'upcoming'
  },
  {
    id: 4,
    name: 'Турнир претендентов 2024',
    dates: '10-25 марта 2024',
    location: 'Торонто',
    prize: '500 000 €',
    status: 'ongoing'
  }
])

// Данные об игроках
const players = ref([
  {
    id: 1,
    name: 'Магнус Карлсен',
    country: 'Норвегия',
    rating: '2859',
    wins: 342,
    losses: 89,
    draws: 156
  },
  {
    id: 2,
    name: 'Хикару Накамура',
    country: 'США',
    rating: '2788',
    wins: 298,
    losses: 102,
    draws: 143
  },
  {
    id: 3,
    name: 'Ян Непомнящий',
    country: 'Россия',
    rating: '2795',
    wins: 267,
    losses: 95,
    draws: 178
  },
  {
    id: 4,
    name: 'Алиреза Фирузджа',
    country: 'Франция',
    rating: '2777',
    wins: 189,
    losses: 67,
    draws: 98
  },
  {
    id: 5,
    name: 'Фабиано Каруана',
    country: 'США',
    rating: '2783',
    wins: 276,
    losses: 88,
    draws: 165
  },
  {
    id: 6,
    name: 'Дин Лижэнь',
    country: 'Китай',
    rating: '2780',
    wins: 234,
    losses: 79,
    draws: 156
  }
])

// Функция для перехода на страницу букмекера с выбранным матчем
const goToBookmaker = (player1, player2, odds1, oddsDraw, odds2) => {
  // Проверяем авторизацию
  if (!userStore.getCurrentUser()) {
    router.push({ 
      name: 'login', 
      query: { redirect: '/chess' }
    })
    return
  }

  // Создаем объект матча для bookmaker.vue
  const match = {
    id: Date.now(), // Временный ID
    tournament: 'Chess Masters 2024',
    player1: player1,
    player2: player2,
    date: new Date().toLocaleString('ru-RU'),
    odds1: odds1,
    oddsDraw: oddsDraw,
    odds2: odds2
  }

  // Сохраняем матч в sessionStorage для передачи в bookmaker.vue
  sessionStorage.setItem('selectedMatch', JSON.stringify(match))

  // Переходим на страницу букмекера
  router.push({ 
    name: 'bookmaker'
  })
}

// Получение статуса турнира
const getStatusText = (status) => {
  const statuses = {
    upcoming: 'Предстоящий',
    ongoing: 'В процессе',
    finished: 'Завершен'
  }
  return statuses[status] || status
}
</script>

<style scoped>
.chess-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

h2 {
  color: #34495e;
  margin: 30px 0 20px 0;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.info-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
}

.info-section h1 {
  color: white;
  margin-top: 0;
}

.info-content p {
  line-height: 1.6;
  margin-bottom: 15px;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.rule-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #3498db;
}

.rule-card h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
}

.rule-card p {
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.tournaments-list,
.players-list,
.matches-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.tournament-card,
.player-card,
.match-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.tournament-card:hover,
.player-card:hover,
.match-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.tournament-card h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
}

.tournament-info p {
  margin: 8px 0;
  color: #666;
}

.status {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
}

.status.upcoming {
  background: #3498db;
  color: white;
}

.status.ongoing {
  background: #e67e22;
  color: white;
}

.status.finished {
  background: #95a5a6;
  color: white;
}

.player-card {
  text-align: center;
  position: relative;
}

.player-rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #2c3e50;
  color: gold;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
}

.player-card h3 {
  margin: 30px 0 5px 0;
  color: #2c3e50;
}

.player-card p {
  color: #666;
  margin-bottom: 15px;
}

.player-stats {
  display: flex;
  justify-content: space-around;
  padding-top: 15px;
  border-top: 1px solid #ecf0f1;
}

.player-stats span {
  font-size: 12px;
  color: #7f8c8d;
}

.match-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ecf0f1;
}

.tournament-name {
  font-weight: bold;
  color: #3498db;
}

.match-date {
  font-size: 12px;
  color: #7f8c8d;
}

.match-players {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.player {
  text-align: center;
  flex: 1;
}

.player-name {
  display: block;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 8px;
  color: #2c3e50;
}

.player-rating-badge {
  display: inline-block;
  background: #ecf0f1;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #7f8c8d;
}

.vs {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
  margin: 0 15px;
}

.match-coefficients {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 20px 0;
}

.coefficient {
  flex: 1;
  text-align: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.2s;
}

.coefficient:hover {
  transform: scale(1.05);
  background: #e8f4f8;
}

.coefficient span {
  display: block;
  font-size: 12px;
  color: #7f8c8d;
  margin-bottom: 8px;
}

.coefficient strong {
  display: block;
  font-size: 20px;
  color: #2c3e50;
  font-weight: bold;
}

.bet-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;
}

.bet-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.bet-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .chess-container {
    padding: 15px;
  }
  
  .tournaments-list,
  .players-list,
  .matches-list {
    grid-template-columns: 1fr;
  }
  
  .match-players {
    flex-direction: column;
    gap: 15px;
  }
  
  .vs {
    margin: 10px 0;
  }
  
  .match-coefficients {
    flex-direction: column;
    gap: 10px;
  }
  
  .player-name {
    font-size: 20px;
  }
}
</style>