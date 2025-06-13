<script setup>

const props = defineProps({
    tasks: Array
})

const emit = defineEmits(['toggle', 'delete'])
</script>

<template>
   <div 
        class="rowContainer" 
        v-for="(task, index) in tasks" 
        :key="index"
    >
        <div class="textContainer">
            <font-awesome-icon
            :icon="['far', task.done ? 'square-check' : 'square']"
            :style="{ color: task.done ? '#768A96' : '#44576D', cursor: 'pointer' }"
            @click="emit('toggle', index)"
            />
            <h1 :class="{ done: task.done }">{{ task.name }}</h1>
        </div>
        <font-awesome-icon
            :icon="['far', 'trash-can']"
            :style="{ color: 'red', cursor: 'pointer' }"
            @click="emit('delete', index)"
        />
    </div>

</template>

<style>
.rowContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
}
.textContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    width: 100%;
}

h1 {
    font-size: 20px;
    margin-left: 13px;
    color: #29353C;
}
.done {
    text-decoration: line-through;
    color: '#768A96';
}
</style>
