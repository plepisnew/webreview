<template>
  <img
    alt="mongodb-image"
    :src="imageBuffer"
    :width="this.width || '100%'"
    :height="this.height || '100%'"
    :class="this.rounded ? 'rounded-circle' : ''"
    :style="`border-radius: ${radius}`"
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
    radius: [Number, String],
    rounded: Boolean
  },
  data() {
    return {
      imageBuffer: ''
    }
  },
  // removes `images/` prefix and `.png` suffix
  async mounted() {
    if (!this.src) return
    const resourceName = this.src
      .split('.png')[0]
      .split('images/')
      .at(-1)
    const res = await Api.get(`/images/${resourceName}`)
    const image = res.data.image
    const source = `data:${image.contentType};base64, ${Buffer.from(
      image.data
    ).toString('base64')}`
    this.imageBuffer = source
  },
  created() {}
}
</script>

<style scoped>
img {
  max-height: 100%;
}
</style>
