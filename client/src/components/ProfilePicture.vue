<template>
  <MongoImage
    class="profile-picture"
    :src="src"
    :width="dimensions"
    :height="dimensions"
  />
</template>

<script>
import MongoImage from './MongoImage.vue'

export default {
  name: 'ProfilePicture',
  components: { MongoImage },
  props: {
    src: {
      type: String,
      required: true
    },
    dimensions: {
      type: [String, Number],
      default: 50
    }
  }
}
</script>

<style scoped>
img {
  object-fit: cover;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}
</style>
