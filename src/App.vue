<script setup>
import IconButton from './components/IconButton.vue'
import ListContainer from './components/ListContainer.vue'
import {ref} from 'vue'

const text = ref('')
const tasks = ref([])

function addTask() {
  const trimmed = text.value.trim()
  if (trimmed) {
    tasks.value.push({ name: trimmed, done: false })
    text.value = ''
  }
}

function toggleTask(index) {
  tasks.value[index].done = !tasks.value[index].done
}

function deleteTask(index) {
  tasks.value.splice(index, 1)
}
</script>

<template>
  <h1 class="title">TO-DO LIST</h1>
  <div class="container">
    <div class="inputContainer">
      <input v-model="text" placeholder="Enter task" />
      <IconButton icon="plus" buttonColor="#29353C" iconColor="white" @click="addTask" />
    </div>
    <div class="scrollableList">
      <ListContainer 
      :tasks="tasks" 
      @toggle="toggleTask" 
      @delete="deleteTask" 
    />
    </div>
    
  </div>
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  background-color: #F3F3F3;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
.title{
  color: #29353C;            
  font-size: 60px;           
  letter-spacing: 10px;  
  font-family: 'Poppins';    
  font-weight: medium;  
  margin-bottom: 10px;      
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F9F9F9;
  padding-top:40px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  width: 599px;
  height: 533px;
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
  font-size: 20px;
  color: #29353C;
  padding-left: 10px;
}
.scrollableList {
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding-right: 4px; 
}



</style>
