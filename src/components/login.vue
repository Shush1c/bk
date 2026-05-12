<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import useusers from '../composables/useusers'

const router = useRouter()
const userStore = useusers()

const inputs = reactive({
  login: '',
  password: ''
})

const errors = reactive({
  login: '',
  password: ''
})

function loginUser() {
  let flag = true

  errors.login = ''
  errors.password = ''

  if (!inputs.login.trim()) {
    errors.login = 'Введите логин'
    flag = false
  }

  if (!inputs.password.trim()) {
    errors.password = 'Введите пароль'
    flag = false
  }

  if (!flag) return

  const result = userStore.login(inputs.login, inputs.password)

  if (result) {
    router.push({ name: 'profile' })
  } else {
    errors.password = 'Неверный логин или пароль'
  }
}
</script>

<template>
  <div class="form-page">
    <h1>Вход</h1>

    <div class="form-group">
      <label>Логин</label>
      <input v-model="inputs.login" type="text">
      <div class="error">{{ errors.login }}</div>
    </div>

    <div class="form-group">
      <label>Пароль</label>
      <input v-model="inputs.password" type="password">
      <div class="error">{{ errors.password }}</div>
    </div>

    <button @click="loginUser">Войти</button>
  </div>
</template>

<style scoped>
.form-page {
  max-width: 420px;
  margin: 50px auto;
  padding: 30px;
  background: rgb(0, 0, 0);
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
}

.error {
  min-height: 18px;
  color: #c62828;
  font-size: 13px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #111;
  color: white;
  font-weight: 800;
  cursor: pointer;
}
</style>
