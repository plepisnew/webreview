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
.pfp-container {
  display: inline-block;
  position: relative;
  width: 100%;
}

.dummy {
  margin-top: 100%;
}

/* img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: silver;
} */

img {
  object-fit: cover;
  aspect-ratio: 1/1;
  /* width: 100%; */
}
</style>
