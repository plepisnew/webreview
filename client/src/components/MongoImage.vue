<template>
  <img
    alt="mongodb-image"
    :src="imageBuffer"
    :width="this.width || '100%'"
    :height="this.height || '100%'"
    :class="this.rounded ? 'rounded-circle' : ''"
  />
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'MongoImage',
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      value: [Number, String]
    },
    height: {
      value: [Number, String]
    },
    rounded: Boolean
  },
  data() {
    return {
      imageBuffer: ''
    }
  },
  async mounted() {
    const res = await Api.get(`/images/${this.src}`)
    const image = res.data.image
    const source = `data:${image.contentType};base64, ${Buffer.from(
      image.data
    ).toString('base64')}`
    this.imageBuffer = source
  }
}
</script>

<style scoped>
img {
  /* max-width: 100%; */
  max-height: 100%;
}
</style>
