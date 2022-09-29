<template>
  <div>
    <span>Home Page</span>
    <Button text="press me :)" :onClick="this.log" variant="grey" />
    <MongoImage src="barox" />
  </div>
</template>

<script>
import Button from '@/components/Button'
import MongoImage from '../components/MongoImage.vue'

export default {
  name: 'home',
  components: {
    Button,
    MongoImage
  },
  methods: {
    log() {
      console.log('hello?')
    }
  }
}
</script>

<style></style>
