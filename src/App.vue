<template>
  <div>
    <header class="header">
      <RouterLink to="/" class="logo">ChessBet</RouterLink>

      <nav class="menu">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/chess">Шахматы</RouterLink>
        <RouterLink to="/bookmaker">БК</RouterLink>
        <RouterLink to="/registration">Регистрация</RouterLink>
        <RouterLink to="/login">Вход</RouterLink>
        <RouterLink to="/profile">Личный кабинет</RouterLink>
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
  gap: 18px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.menu a:hover {
  color: #f4c430;
}

.content {
  padding: 30px;
}
</style>