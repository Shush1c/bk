<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import usematches from '../composables/usematches'
import useusers from '../composables/useusers'

const userStore = useusers()
const router = useRouter()
const selectedBet = ref(null)
const betAmount = ref('')
const message = ref('')

const matchesStore = usematches()

const possibleWin = computed(() => {
  if (!selectedBet.value || !betAmount.value) return 0
  return Number(betAmount.value) * selectedBet.value.odd
})

function selectBet(match, result, odd) {
  selectedBet.value = {
    matchId: match.id,
    title: `${match.player1} — ${match.player2}`,
    result: result,
    odd: odd
  }

  message.value = ''
}

function makeBet() {
  const currentUser = userStore.getCurrentUser()
  const amount = Number(betAmount.value)

  if (!currentUser) {
    message.value = 'Сначала войдите в аккаунт'
    router.push({ name: 'login' })
    return
  }

  if (!selectedBet.value) {
    message.value = 'Выберите исход матча'
    return
  }

  if (!amount || amount <= 0) {
    message.value = 'Введите сумму ставки'
    return
  }

  const result = userStore.minusBalance(amount)

  if (!result) {
    message.value = 'Недостаточно средств'
    return
  }

  userStore.addBet({
  matchId: selectedBet.value.matchId,
  match: selectedBet.value.title,
  result: selectedBet.value.result,
  odd: selectedBet.value.odd,
  amount: amount,
  possibleWin: possibleWin.value,
  status: 'Ожидает результата',
  date: new Date().toLocaleString()
})

  message.value = `Ставка принята! Возможный выигрыш: ${possibleWin.value} ₽`
  selectedBet.value = null
  betAmount.value = ''

}
</script>

<template>
  <div class="bookmaker-page">
    <div class="hero">
      <h1>Букмекерская контора</h1>
      <p>Ставки на шахматные матчи</p>
    </div>

    <div class="balance" v-if="userStore.getCurrentUser()">
  Баланс: {{ userStore.getCurrentUser().balance }} ₽
</div>

<div class="balance" v-else>
  Войдите, чтобы делать ставки
</div>

    <div class="layout">
      <div class="matches">
        <div
          v-for="match in matchesStore.matches.value"
          :key="match.id"
          class="match-card"
        >
          <div class="match-info">
            <span>{{ match.tournament }}</span>
            <span>{{ match.date }}</span>
          </div>

          <h2>{{ match.player1 }} — {{ match.player2 }}</h2>

          <div class="odds">
            <button @click="selectBet(match, 'Победа 1', match.odds1)">
              П1 <b>{{ match.odds1 }}</b>
            </button>

            <button @click="selectBet(match, 'Ничья', match.oddsDraw)">
              X <b>{{ match.oddsDraw }}</b>
            </button>

            <button @click="selectBet(match, 'Победа 2', match.odds2)">
              П2 <b>{{ match.odds2 }}</b>
            </button>
          </div>
        </div>
      </div>

      <div class="coupon">
        <h2>Купон ставки</h2>

        <div v-if="selectedBet">
          <p><b>Матч:</b> {{ selectedBet.title }}</p>
          <p><b>Исход:</b> {{ selectedBet.result }}</p>
          <p><b>Коэффициент:</b> {{ selectedBet.odd }}</p>

          <input
            v-model="betAmount"
            type="number"
            placeholder="Сумма ставки"
          >

          <p class="win">
            Возможный выигрыш: {{ possibleWin }} ₽
          </p>

          <button class="bet-btn" @click="makeBet">
            Сделать ставку
          </button>
        </div>

        <div v-else class="empty">
          Выберите коэффициент
        </div>

        <div v-if="message" class="message">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookmaker-page {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  padding: 50px 30px;
  border-radius: 24px;
  background: linear-gradient(135deg, #111, #2b2b2b);
  color: white;
  margin-bottom: 25px;
}

.hero h1 {
  font-size: 42px;
  margin: 0 0 10px;
}

.hero p {
  font-size: 20px;
  color: #ddd;
  margin: 0;
}

.balance {
  display: inline-block;
  margin-bottom: 25px;
  padding: 12px 18px;
  border-radius: 12px;
  background: #111;
  color: #f4c430;
  font-weight: 900;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 330px;
  gap: 25px;
}

.matches {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.match-card,
.coupon {
  background: rgb(0, 0, 0);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.12);
}

.match-info {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 14px;
}

.match-card h2 {
  margin: 15px 0;
  font-size: 22px;
}

.odds {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 11px;
}

.odds button {
  border: none;
  border-radius: 12px;
  padding: 14px;
  background: #111;
  color: white;
  font-weight: 800;
  cursor: pointer;
}

.odds button:hover {
  background: #f4c430;
  color: black;
}

.coupon {
  height: fit-content;
  position: sticky;
  top: 20px;
}

.coupon h2 {
  margin-top: 0;
}

.coupon input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  margin: 10px 0;
}

.win {
  font-weight: 900;
}

.bet-btn {
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 14px;
  background: #f4c430;
  color: black;
  font-weight: 900;
  cursor: pointer;
}

.empty {
  color: #777;
}

.message {
  margin-top: 14px;
  padding: 12px;
  border-radius: 12px;
  background: #000000;
  font-weight: 700;
}

@media (max-width: 850px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .coupon {
    position: static;
  }
}
</style>