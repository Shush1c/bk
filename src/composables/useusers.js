import { ref } from 'vue'

const users = ref([
  {
    id: 1,
    login: 'admin',
    password: '123456',
    email: 'admin@mail.ru',
    balance: 10000,
    role: 'admin',
    betHistory: []
  }
])

const currentUserId = ref(null)
const newUserId = ref(2)


function register(newUser) {
  users.value.push({
    id: newUserId.value,
    login: newUser.login,
    password: newUser.password,
    email: newUser.email,
    balance: 0,
    role: 'user',
    betHistory: []
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
    user.balance = Number((user.balance + Number(amount)).toFixed(2))
  }
}

function minusBalance(amount) {
  const user = getCurrentUser()

  if (user && user.balance >= Number(amount)) {
    user.balance = Number((user.balance - Number(amount)).toFixed(2))
    return true
  }

  return false
}

function addBet(bet) {
  const user = getCurrentUser()

  if (user) {
    user.betHistory.push({
      id: Date.now(),
      ...bet
    })
  }
}
function calculateBets(matchId, winner) {
  users.value.forEach(user => {
    user.betHistory.forEach(bet => {
      if (
        bet.matchId === Number(matchId) &&
        bet.status === 'Ожидает результата'
      ) {
        if (bet.result === winner) {
          bet.status = 'Выиграла'
          user.balance = Number(
              (user.balance + Number(bet.possibleWin)).toFixed(2)
            )
        } else {
          bet.status = 'Проиграла'
        }
      }
    })
  })
}


function isAdmin() {
  const user = getCurrentUser()
  return user && user.role === 'admin'
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
    minusBalance,
    addBet,
    isAdmin,
    calculateBets
  }
}