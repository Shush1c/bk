import { ref } from 'vue'

const matches = ref([
  {
    id: 1,
    tournament: 'Chess Masters',
    player1: 'Магнус Карлсен',
    player2: 'Хикару Накамура',
    date: '20.04.2026',
    odds1: 1.75,
    oddsDraw: 3.2,
    odds2: 2.1
  },
  {
    id: 2,
    tournament: 'Grand Chess Cup',
    player1: 'Ян Непомнящий',
    player2: 'Алиреза Фируджа',
    date: '21.04.2026',
    odds1: 1.9,
    oddsDraw: 3.0,
    odds2: 2.0
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

export default function usematches() {
  return {
    matches,
    addMatch,
    deleteMatch,
    updateMatch
  }
}