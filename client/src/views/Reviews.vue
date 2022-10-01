<template>
  <div>
    <img :src="picture" />
    Reviews page
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'reviews',
  data() {
    return {
      picture: ''
    }
  },
  mounted() {
    Api.get('/images/barox').then(res => {
      const image = res.data.image
      //   console.log(image)
      const source = `data:${image.contentType};base64, ${Buffer.from(
        image.data
      ).toString('base64')}`
      //   console.log(source)
      this.setPicture(source)
    })
    console.log(localStorage.token)
  },
  methods: {
    setPicture(src) {
      this.picture = src
    }
  }
}
</script>

<style></style>
