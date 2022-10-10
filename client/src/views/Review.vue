<template>
  <div></div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'review',
  data() {
    return {
      review: {}
    }
  },
  async created() {
    const reviewId = this.$route.params.id
    const res = await Api.get(`/reviews/${reviewId}`)
    this.review = res.data
  }
}
</script>

<style></style>
