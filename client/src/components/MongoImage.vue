<template>
  <img alt="kek" :src="imageBuffer" :width="this.width" :height="this.height" />
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'MongoImage',
  props: {
    src: {
      type: String,
      default: 'image'
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
