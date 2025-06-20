<script setup>

const props = defineProps({
    tasks: Array
})

const emit = defineEmits(['toggle', 'delete', 'edit'])
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
            @click="emit('toggle', task)"
            />
            <p :class="{ done: task.done }">{{ task.name }}</p>
        </div>
        <font-awesome-icon
            :icon="['fas', 'pencil']"
            :style="{ color: '#44576D', cursor: 'pointer', paddingRight: '20px' }"
            @click="emit('edit', task)"
        />
        <font-awesome-icon
            :icon="['far', 'trash-can']"
            :style="{ color: 'red', cursor: 'pointer' }"
            @click="emit('delete', task)"
        />
        
    </div>

</template>

<style>
.rowContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
}
.textContainer {
    display: flex;
    flex-direction: row;
    align-items: center; 
    width: 100%;
    gap: 10px;
}

p {
    font-size: 20px;
    margin: 0 13px 0 13px;
    color: #29353C;
    word-break: break-word;
    white-space: normal;
    flex: 1;
}
.done {
    text-decoration: line-through;
    color: '#768A96';

}
</style>
