<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useusers from '../composables/useusers'


const router = useRouter()
const userStore = useusers()
const cardNumber = ref('')
const cardError = ref('')
const amount = ref('')
const message = ref('')

const currentUser = computed(() => {
  return userStore.getCurrentUser()
})

function withdraw() {
  router.push({ name: 'page404' })
}

function deposit() {
  message.value = ''
  cardError.value = ''

  const money = Number(amount.value)

  if (!money || money < 100 ) {
    message.value = 'Сумма должна быть от 100'
    return
  }

  if (money > 1000000) {
    message.value = 'У тя сток деняг нету, нуб (watch demo)'
    return
  }

  if (cardNumber.value.length !== 16) {
    cardError.value = 'Номер карты должен содержать 16 цифр'
    return
  }

  userStore.addBalance(money)

  message.value = `Баланс пополнен на ${money} ₽`

  amount.value = ''
  cardNumber.value = ''
}
</script>
<template>
  <div class="profile-page" v-if="currentUser">
    <h1>Личный кабинет</h1>

    <div class="card">
      <p><b>Логин:</b> {{ currentUser.login }}</p>
      <p><b>Почта:</b> {{ currentUser.email }}</p>
      <p class="balance"><b>Баланс:</b> {{ currentUser.balance }} ₽</p>
    </div>

    <div class="card">
  <h2>Пополнение баланса</h2>

  <input
    v-model="cardNumber"
    type="text"
    maxlength="16"
    placeholder="Введите номер карты"
  />

  <input
    v-model="amount"
    type="number"
    min="100"
    max="1000000"
    placeholder="Введите сумму"
  />

  <div v-if="cardError" class="error">
    {{ cardError }}
  </div>

  <button @click="deposit">Пополнить</button>

  <div v-if="message" class="message">
    {{ message }}
  </div>
      <h3><button class="withdraw-btn" @click="withdraw">
  Вывод средств
</button>
</h3>
</div>

    <div class="card">
      <h2>История ставок</h2>

      <div v-if="currentUser.betHistory.length > 0">
        <div
          v-for="bet in currentUser.betHistory"
          :key="bet.id"
          class="bet-card"
        >
          <p><b>Матч:</b> {{ bet.match }}</p>
          <p><b>Исход:</b> {{ bet.result }}</p>
          <p><b>Коэффициент:</b> {{ bet.odd }}</p>
          <p><b>Сумма ставки:</b> {{ bet.amount }} ₽</p>
          <p><b>Возможный выигрыш:</b> {{ bet.possibleWin }} ₽</p>
          <p><b>Дата:</b> {{ bet.date }}</p>
          <p
            class="status"
            :class="{
              win: bet.status === 'Выиграла',
              lose: bet.status === 'Проиграла',
              wait: bet.status === 'Ожидает результата'
            }"
          >
            <b>Статус:</b> {{ bet.status }}
          </p>
        </div>
      </div>

      <p v-else class="empty">
        Ставок пока нет
      </p>
    </div>

    <button class="logout" @click="logout">
      Выйти
    </button>
  </div>

  <div v-else class="profile-page">
    <h1>Вы не вошли в аккаунт</h1>
    <RouterLink to="/login">Перейти ко входу</RouterLink>
  </div>
</template>

<style scoped>
.withdraw-btn {
  width: 100%;
  margin-top: 12px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #000000;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.withdraw-btn:hover {
  background: #000000;
}
.profile-page {
  max-width: 800px;
  margin: 50px auto;
}
.error {
  margin-bottom: 12px;
  color: #c62828;
  font-weight: 700;
}
.card {
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.12);
  margin-bottom: 20px;
}

.balance {
  font-size: 22px;
  font-weight: 800;
}
.status {
  font-weight: 800;
}

.win {
  color: green;
}

.lose {
  color: #c62828;
}

.wait {
  color: #b8860b;
}
input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
}
button {
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  background: #111;
  color: white;
  font-weight: 800;
  cursor: pointer;
}

.message {
  margin-top: 12px;
  font-weight: 700;
  color: rgb(255, 0, 0);
}

.bet-card {
  padding: 0px;
  border-radius: 0px;
  background: #272727;
  margin-bottom: 1px;
}

.empty {
  color: #777;
}

.logout {
  background: #c62828;
}
</style>
