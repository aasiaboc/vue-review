<script setup>
import IconButton from './components/IconButton.vue'
import ListContainer from './components/ListContainer.vue'
import {ref, computed } from 'vue'

const text = ref('')
const tasks = ref([])
const filter = ref('all')

function addTask() {
  const trimmed = text.value.trim()
  if (trimmed) {
    tasks.value.push({ name: trimmed, done: false })
    text.value = ''
  }
}

function toggleTask(task) {
  task.done = !task.done
}

function deleteTask(task) {
  tasks.value.splice(tasks.value.indexOf(task), 1)
}

function editTask(task) {
  const newName = prompt('Edit task name:', task.name)
  if (newName !== null && newName.trim() !== '') {
    task.name = newName.trim()
  }
}


const filteredTasks = computed(() => {
  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.done)
  } else if (filter.value === 'pending') {
    return tasks.value.filter(task => !task.done)
  }
  return tasks.value
})

</script>

<template>
  <h1 class="title">TO-DO LIST</h1>
  <div class="container">
    <div class="inputContainer">
      <input v-model="text" placeholder="Enter task" />
      <IconButton icon="plus" buttonColor="#29353C" iconColor="white" @click="addTask" />
    </div>
    <div class="filterContainer">
        <label>Filter: </label>
        <select v-model="filter">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
        </select>
    </div>
    <div class="scrollableList">
      <ListContainer 
      :tasks="filteredTasks" 
      @toggle="toggleTask" 
      @delete="deleteTask" 
      @edit="editTask"
    />
    </div>
    
  </div>
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 10px;
  background-color: #F3F3F3;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  overflow-y: auto;
}
.title{
  color: #29353C;            
  font-size: 60px;           
  letter-spacing: 10px;  
  text-align: center;
  font-family: 'Poppins';    
  font-weight: medium;  
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F9F9F9;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  height: 550px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}
.inputContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #44576D;
  padding-bottom: 15px; 
  margin-bottom: 10px;
}

.inputContainer input {
  border: 0;
  outline: none;
  background: transparent;
  flex: 1;
  font-family: 'Poppins';  
  font-weight: normal;  
  font-size: 18px;
  color: #29353C;
  padding-left: 10px;

}
.filterContainer {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  justify-content: flex-end;
  font-family: 'Poppins';
  font-size: 14px;
  color: #29353C;
  gap:10px;
}

.filterContainer select {
  border: 0;
  outline: none;
  background: transparent;
  border: 1px solid #44576D;
  border-radius: 20px;
  background-color: white;
  color: #29353C;
  font-family: 'Poppins';
}

.scrollableList {
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding-right: 4px; 
}


/* mobile adjustments */
@media (max-width: 480px) {
  .title {
    font-size: 10vw;
    letter-spacing: 3px;
    text-align: center;
  }

  .inputContainer input {
    font-size: 1rem;
  }

  .container {
    padding: 1rem;
  }
}
</style>
