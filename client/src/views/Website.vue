<template>
  <div class="specific-website">
    <div class="website-panel">
      <div class="website-content">Website</div>
      <div class="lighthouse-container">lighthouse</div>
    </div>
    <div class="review-container">
      <h2 class="reviews-title p-2">User Reviews:</h2>
      <div class="review-scrollbar">
        <ReviewCards :reviews="reviews" />
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ReviewCards from '../components/reviews/ReviewCards.vue'

export default {
  name: 'Website',
  data() {
    return {
      website: {},
      reviews: [],
      averageRating: 0
    }
  },
  async created() {
    const websiteName = this.$route.params.name
    const res1 = await Api.get(`/websites?name=${websiteName}`)
    const { website, averageRating } = res1.data[0]
    const res2 = await Api.get(`/websites/${website._id}/reviews`)
    const reviews = res2.data
    console.log(reviews)
    this.averageRating = averageRating
    this.website = website
    this.reviews = reviews
  },
  components: { ReviewCards }
}
</script>

<style scoped>
.specific-website {
  display: flex;
  height: 100%;
}

.website-panel,
.review-panel {
  flex: 1;
  /* height: 100%; */
}

.website-panel {
  background: lightblue;
}

.review-container {
  height: 100%;
}

.review-scrollbar {
  height: 100%;
}
</style>
