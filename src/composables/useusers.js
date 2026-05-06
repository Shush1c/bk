import { ref } from 'vue'

const users = ref([
  {
    id: 1,
    login: 'admin',
    password: '123456',
    email: 'admin@mail.ru',
    balance: 10000,
    role: 'admin'
  }
])

const currentUserId = ref(null)
const newUserId = ref(2)

function register(newUser) {
  const found = users.value.find(user => user.login === newUser.login)

  if (found) {
    return false
  }

  users.value.push({
    id: newUserId.value,
    login: newUser.login,
    password: newUser.password,
    email: newUser.email,
    balance: 1000,
    role: 'user'
  })

  currentUserId.value = newUserId.value
  newUserId.value++

  return true
}

function login(login, password) {
  const user = users.value.find(
    item => item.login === login && item.password === password
  )

  if (user) {
    currentUserId.value = user.id
    return true
  }

  return false
}

function logout() {
  currentUserId.value = null
}

function getCurrentUser() {
  return users.value.find(user => user.id === currentUserId.value)
}

function addBalance(amount) {
  const user = getCurrentUser()

  if (user) {
    user.balance += Number(amount)
  }
}

function minusBalance(amount) {
  const user = getCurrentUser()

  if (user && user.balance >= Number(amount)) {
    user.balance -= Number(amount)
    return true
  }

  return false
}

export default function useusers() {
  return {
    users,
    currentUserId,
    register,
    login,
    logout,
    getCurrentUser,
    addBalance,
    minusBalance
  }
}