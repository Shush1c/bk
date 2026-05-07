import { ref } from 'vue'

const matches = ref([
  {
    id: 1,
    tournament: 'Chess Masters',
    player1: 'Zywoo ',
    player2: 'S1mple',
    date: '12.05.2026',
    odds1: 1.75,
    oddsDraw: 3.2,
    odds2: 2.1,
    status: 'open',
    winner: ''
  },
  {
    id: 2,
    tournament: 'Grand Chess Cup',
    player1: 'Deko',
    player2: 'Shush1k',
    date: '12.05.2026',
    odds1: 15,
    oddsDraw: 10,
    odds2: 1.01,
    status: 'open',
    winner: ''
  }
])

const newMatchId = ref(3)

function addMatch(newMatch) {
  matches.value.push({
    ...newMatch,
    id: newMatchId.value
  })

  newMatchId.value++
}

function deleteMatch(id) {
  matches.value = matches.value.filter(match => match.id !== Number(id))
}

function updateMatch(id, updatedMatch) {
  const match = matches.value.find(match => match.id === Number(id))

  if (match) {
    match.tournament = updatedMatch.tournament
    match.player1 = updatedMatch.player1
    match.player2 = updatedMatch.player2
    match.date = updatedMatch.date
    match.odds1 = Number(updatedMatch.odds1)
    match.oddsDraw = Number(updatedMatch.oddsDraw)
    match.odds2 = Number(updatedMatch.odds2)
  }
}

function finishMatch(id, winner) {
  const match = matches.value.find(match => match.id === Number(id))

  if (match) {
    match.status = 'finished'
    match.winner = winner
  }
}

export default function usematches() {
  return {
    matches,
    addMatch,
    deleteMatch,
    updateMatch,
    finishMatch
  }
}