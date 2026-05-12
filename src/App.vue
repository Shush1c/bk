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
  align-items: center;
  justify-content: space-between;

  height: 80px;             
  padding: 0 40px;

  background: #111827;
  color: white;

  box-sizing: border-box;
}

.nav {
  display: flex;
  align-items: center;
  gap: 20px;

  height: 100%;
}

.nav a {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;          
  padding: 0 20px;

  border-radius: 12px;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;

  transition: 0.3s;
}
body {
  margin: 0;
}

#app {
  min-height: 100vh;
}
.nav a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav a.router-link-active {
  background: #2563eb;
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