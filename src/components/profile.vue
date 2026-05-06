<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useusers from '../composables/useusers'

const router = useRouter()
const userStore = useusers()

const amount = ref('')
const message = ref('')

const currentUser = computed(() => {
  return userStore.getCurrentUser()
})

function deposit() {
  if (!amount.value || Number(amount.value) <= 0) {
    message.value = 'Введите корректную сумму'
    return
  }

  userStore.addBalance(Number(amount.value))
  message.value = `Баланс пополнен на ${amount.value} ₽`
  amount.value = ''
}

function logout() {
  userStore.logout()
  router.push({ name: 'home' })
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
        v-model="amount"
        type="number"
        placeholder="Введите сумму"
      >

      <button @click="deposit">Пополнить</button>

      <div v-if="message" class="message">
        {{ message }}
      </div>
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
.profile-page {
  max-width: 800px;
  margin: 50px auto;
}

.card {
  background: white;
  color: black;
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
  margin-bottom: 20px;
}

.balance {
  font-size: 22px;
  font-weight: 800;
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
  color: green;
}

.bet-card {
  padding: 14px;
  border-radius: 14px;
  background: #f3f3f3;
  margin-bottom: 12px;
}

.empty {
  color: #777;
}

.logout {
  background: #c62828;
}
</style>
