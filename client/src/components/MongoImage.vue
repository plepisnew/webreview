<template>
  <img
    :alt="src"
    :src="imageBuffer"
    :width="width || '100%'"
    :height="height || '100%'"
    :class="rounded ? 'rounded-circle' : ''"
    :style="`border-radius: ${radius}`"
  />
</template>

<script>
import { Api } from '@/Api'
import { mapActions } from 'vuex'

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
  methods: mapActions(['addImage']),
  // removes `images/` prefix and `.png` suffix
  async mounted() {
    if (!this.src) return
    const resourceName = this.src
      .split('.png')[0]
      .split('images/')
      .at(-1)
    const value = this.$store.state.images[resourceName]
    // const value = null
    if (value) {
      this.imageBuffer = value
      this.addImage({ src: resourceName, data: value })
    } else {
      const res = await Api.get(`/images/${resourceName}`)
      const image = res.data.image
      const source = `data:${image.contentType};base64, ${Buffer.from(
        image.data
      ).toString('base64')}`
      this.imageBuffer = source
      this.addImage({ src: resourceName, data: source })
    }
  }
}
</script>

<style scoped>
img {
  max-height: 100%;
}
</style>
