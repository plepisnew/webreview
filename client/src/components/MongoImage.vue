<template>
  <img
    alt="kek"
    :src="imageBuffer"
    :width="this.width || '100%'"
    :height="this.height || '100%'"
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
    width: Number,
    height: Number
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
  max-width: 100%;
}
</style>
