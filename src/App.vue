<script setup>
import useusers from './composables/useusers'
import { useRouter } from 'vue-router'


const userStore = useusers()
const router = useRouter()

function isAuth() {
  return userStore.currentUserId.value !== null
}

function isAdmin() {
  return userStore.isAdmin()
}

function logout() {
  userStore.logout()
  router.push({ name: 'home' })
}
</script>
<template>
  <div>
    <header class="header">
      <RouterLink to="/" class="logo">N-SNUiS</RouterLink>

      <nav class="menu">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/chess">Шахматы</RouterLink>
        <RouterLink to="/bookmaker">БК</RouterLink>
        <RouterLink v-if="!isAuth()" to="/registration">Регистрация</RouterLink>
        <RouterLink v-if="!isAuth()" to="/login">Вход</RouterLink>
        <RouterLink v-if="isAdmin()" :to="{ name: 'adminmatches' }">Лудоволк</RouterLink>
        <RouterLink v-if="isAuth()" to="/profile">Личный кабинет</RouterLink>
        <button class="but" v-if="isAuth()" @click="logout">Выйти</button>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;
  background: #111;
  color: white;
}

.logo {
  color: #f4c430;
  text-decoration: none;
  font-size: 24px;
  font-weight: 800;
}

.menu {
  display: flex;
  gap: 35px;
  height: 20px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}
.but {
  color: #f4c430;
}
.menu a:hover {
  color: #f4c430;
}

.content {
  padding: 30px;
}
</style>