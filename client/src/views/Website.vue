<template>
  <div class="specific-website" v-if="website">
    <div class="website-panel">
      <div class="website-display">
      <WebsiteDisplay :website="website" :reviewCount="reviews.length" />
      </div>
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
      <div>
        <ReviewCards v-if="reviews.length !== 0" :reviews="reviews" />
      </div>
      </div>
      <LighthouseDisplay class="lighthouse" />
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
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

.website-display {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 30vh;
  align-items: center;
}

.review-container {
  margin-top: 10vh;
  flex: 1;
  width: 75vw;
  height: 40vh;
  background: rgb(50, 50, 50);
  border-radius: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
}

.review-scrollbar {
  height: 60%;
  padding: 15px;
  overflow-y: scroll;
  background: white;
  border-radius: 0 0 15px 15px;
}

.lighthouse {
}
.review-scrollbar:empty {
  padding: 0;
}

@media screen and (max-width: 510px) {
  .specific-website {
    display: flex;
    flex-direction: column;
  }
  .review-container {
    margin-top: 50vh;
  }
}
</style>
