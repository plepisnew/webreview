<template>
  <input
    class="text-field"
    type="text"
    :placeholder="this.placeholder"
    @keydown="handle"
    @input="input"
  />
</template>

<script>
export default {
  name: 'TextField',
  methods: {
    handle(e) {
      if (e.key === 'Enter' && this.handler) this.handler()
    }
  },
  props: {
    placeholder: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: String
    },
    handler: Function,
    input: {
      type: Function,
      required: false,
      default: () => {}
    },
    variant: {
      type: String,
      required: false,
      default: 'input'
    }
  }
}
</script>

<style>
.text-field {
  padding: 2px 5px;
  border: none;
  border-radius: 5px;
  outline: none;
}
</style>
