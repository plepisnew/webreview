<template>
  <div class="specific-website" v-if="website">
    <div class="website-panel">
      <WebsiteDisplay :website="website" :reviewCount="reviews.length" />
      <LighthouseDisplay />
    </div>
    <div class="review-container">
      <h2 class="reviews-title p-2">
        {{
          reviews.length === 0
            ? `${website.name} doesn't have any reviews`
            : 'User Reviews:'
        }}
      </h2>
      <div class="review-scrollbar">
        <ReviewCards v-if="reviews.length !== 0" :reviews="reviews" />
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ReviewCards from '../components/reviews/ReviewCards.vue'
import WebsiteDisplay from '../components/WebsiteDisplay.vue'
import LighthouseDisplay from '../components/LighthouseDisplay.vue'
import { descending } from '@/utils/sortChrono'

export default {
  name: 'Website',
  data() {
    return {
      website: undefined,
      reviews: []
    }
  },
  async beforeCreate() {
    const websiteName = this.$route.params.name
    const res1 = await Api.get(`/websites?name=${websiteName}`)
    const { website, averageRating } = res1.data[0]
    const res2 = await Api.get(`/websites/${website._id}/reviews`)
    const reviews = res2.data.filter(review => !review.isPending)
    this.website = {
      ...website,
      averageRating
    }
    this.reviews = descending(reviews)
  },
  components: { ReviewCards, WebsiteDisplay, LighthouseDisplay }
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
}

.website-panel {
  height: 100%;
}

.review-container {
  height: max-content;
  max-height: 100%;
  background: rgb(50, 50, 50);
  margin: 5px;
  border-radius: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  overflow-y: scroll;
}
.review-scrollbar {
  padding: 15px;
  overflow-y: scroll;
  background: white;
  border-radius: 0 0 15px 15px;
}

.review-scrollbar:empty {
  padding: 0;
}
</style>
