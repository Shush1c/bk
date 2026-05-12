<script setup>
import { reactive, ref } from 'vue'
import usematches from '../composables/usematches'
import useusers from '../composables/useusers'


const matchesStore = usematches()
const userStore = useusers()

const editId = ref(null)

const inputs = reactive({
  tournament: '',
  player1: '',
  player2: '',
  date: '',
  odds1: '',
  oddsDraw: '',
  odds2: ''
})

function clearInputs() {
  editId.value = null
  inputs.tournament = ''
  inputs.player1 = ''
  inputs.player2 = ''
  inputs.date = ''
  inputs.odds1 = ''
  inputs.oddsDraw = ''
  inputs.odds2 = ''
}

function addNewMatch() {
  matchesStore.addMatch({
    tournament: inputs.tournament,
    player1: inputs.player1,
    player2: inputs.player2,
    date: inputs.date,
    odds1: Number(inputs.odds1),
    oddsDraw: Number(inputs.oddsDraw),
    odds2: Number(inputs.odds2),
    status: 'open',
    winner: ''
  })

  clearInputs()
}

function startEdit(match) {
  editId.value = match.id
  inputs.tournament = match.tournament
  inputs.player1 = match.player1
  inputs.player2 = match.player2
  inputs.date = match.date
  inputs.odds1 = match.odds1
  inputs.oddsDraw = match.oddsDraw
  inputs.odds2 = match.odds2
}

function saveEdit() {
  matchesStore.updateMatch(editId.value, {
    tournament: inputs.tournament,
    player1: inputs.player1,
    player2: inputs.player2,
    date: inputs.date,
    odds1: Number(inputs.odds1),
    oddsDraw: Number(inputs.oddsDraw),
    odds2: Number(inputs.odds2)
  })

  clearInputs()
}

function deleteItem(id) {
  matchesStore.deleteMatch(id)
}

function finishMatch(id, winner) {
  matchesStore.finishMatch(id, winner)
  userStore.calculateBets(id, winner)
}
</script>

<template>
  <div class="admin-page">

    <div class="form">
      <h2 v-if="!editId">Добавить событие</h2>
      <h2 v-else>Редактировать событие</h2>

      <input v-model="inputs.tournament" placeholder="Турнир">
      <input v-model="inputs.player1" placeholder="Игрок 1">
      <input v-model="inputs.player2" placeholder="Игрок 2">
      <input v-model="inputs.date" placeholder="Дата">

      <div class="odds-inputs">
        <input v-model="inputs.odds1" type="number" step="0.01" placeholder="Коэф. П1">
        <input v-model="inputs.oddsDraw" type="number" step="0.01" placeholder="Коэф. X">
        <input v-model="inputs.odds2" type="number" step="0.01" placeholder="Коэф. П2">
      </div>

      <button v-if="!editId" @click="addNewMatch">Добавить событие</button>
      <button v-else @click="saveEdit">Сохранить изменения</button>
      <button v-if="editId" class="cancel" @click="clearInputs">Отмена</button>
    </div>

    <div class="list">
      <h2>Список событий</h2>

      <div
        v-for="match in matchesStore.matches.value"
        :key="match.id"
        class="match"
      >
        <div>
          <h3>{{ match.player1 }} — {{ match.player2 }}</h3>
          <p>{{ match.tournament }} | {{ match.date }}</p>
          <p>П1: {{ match.odds1 }} | X: {{ match.oddsDraw }} | П2: {{ match.odds2 }}</p>

          <p v-if="match.status === 'finished'" class="finished">
            Завершён. Результат: {{ match.winner }}
          </p>

          <p v-else class="open">
            Открыт для ставок
          </p>
        </div>

        <div class="actions">
          <button @click="startEdit(match)">Редактировать</button>
          <button class="delete" @click="deleteItem(match.id)">Удалить</button>
        </div>

        <div v-if="match.status !== 'finished'" class="finish-buttons">
          <button @click="finishMatch(match.id, 'Победа 1')">Победа 1</button>
          <button @click="finishMatch(match.id, 'Ничья')">Ничья</button>
          <button @click="finishMatch(match.id, 'Победа 2')">Победа 2</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  max-width: 1000px;
  margin: 40px auto;
  color: rgb(255, 255, 255);
}

.form,
.match {
  background: rgb(0, 0, 0);
  padding: 22px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
}

.odds-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 11px;
}

button {
  border: none;
  border-radius: 12px;
  padding: 12px;
  background: #111;
  color: white;
  font-weight: 800;
  cursor: pointer;
}

.cancel {
  background: #555;
}

.delete {
  background: #c62828;
}

.match {
  display: grid;
  grid-template-columns: 1fr 160px;
  gap: 15px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.finish-buttons {
  grid-column: 1 / 3;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.open {
  color: green;
  font-weight: 800;
}

.finished {
  color: #c62828;
  font-weight: 800;
}
</style>