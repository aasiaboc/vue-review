<script setup>

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  buttonColor: {
    type: String,
    required: false,
    default: 'black',
  },
  iconColor: {
    type: String,
    required: false,
    default: 'white',
  },
})

</script>

<template>
    <button :style="{ backgroundColor: props.buttonColor }">
        <font-awesome-icon 
            :icon="props.icon" 
            class="iconSize"
            :style="{color: props.iconColor, fontsize: '20px'}"
        />
    </button>
</template>

<style>
button {
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 42px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}
.iconSize {
  font-size: 100%; 
  width: 20px;
  height: 20px;
}

</style>