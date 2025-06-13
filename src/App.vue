<script setup>
import IconButton from './components/IconButton.vue'
</script>

<template background>
  <div class="container">
    <IconButton icon="plus" buttonColor="#29353C" iconColor="white"/>
  </div>
  
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #F3F3F3;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container{
  background-color: #F9F9F9;
  width: 599px;
  height: 533px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  
}

</style>
