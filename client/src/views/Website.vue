<template>
  <div class="specific-website">
    <div class="website-panel">
      <div class="website-container">
        <h2 class="websites-title">
          Website
        </h2>
      <WebsiteDisplay :website="website" />
    </div>
      <div class="lighthouse-container">lighthouse</div>
      <LighthouseDisplay/>
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
import WebsiteDisplay from '../components/WebsiteDisplay.vue'
import LighthouseDisplay from '../components/LighthouseDisplay.vue'

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
    const reviews = res2.data
    this.website = {
      ...website,
      averageRating
    }
    this.reviews = reviews
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

.review-container,
.review-scrollbar {
  height: max-content;
}

.review-scrollbar {
  /* height: auto; */
}

.websites-title {
  padding: 5px;
  margin: 0;
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
}

.website-container {
  flex: 1;
  height: 80%;
  background: rgb(50, 50, 50);
  margin: 5px;
  border-radius: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}
</style>
