import { createRouter, createWebHistory } from 'vue-router'

import home from './components/home.vue'
import chess from './components/chess.vue'
import bookmaker from './components/bookmaker.vue'
import login from './components/login.vue'
import registration from './components/registration.vue'
import profile from './components/profile.vue'

const routes = [
  { path: '/', component: home, name: 'home' },
  { path: '/chess', component: chess, name: 'chess' },
  { path: '/bookmaker', component: bookmaker, name: 'bookmaker' },
  { path: '/login', component: login, name: 'login' },
  { path: '/registration', component: registration, name: 'registration' },
  { path: '/profile', component: profile, name: 'profile' }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})