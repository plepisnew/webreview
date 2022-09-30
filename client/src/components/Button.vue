<template>
  <button :class="`button ${variant}`" @click="this.onClick">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true
    },
    onClick: Function,
    variant: {
      default: 'grey',
      type: String
    }
  }
}
</script>

<style scoped>
.button {
  border-radius: 7px;
  padding: 5px 20px;
  border: none;
  color: white;
  font-weight: 400;
  font-family: Poppins;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  transition: background-color 300ms;
}

.grey {
  background-color: #424242;
}

.grey:hover {
  background-color: #505050;
}

.blue {
  background-color: #1e88e5;
}

.blue:hover {
  background-color: #2196f3;
}

.red {
  background-color: #e91e63;
}

.red:hover {
  background-color: #ec407a;
}

.button:active {
  box-shadow: none;
}
</style>
