<template>
  <div class="specific-website" v-if="website">
    <div class="website-panel">
      <WebsiteDisplay :website="website" :reviewCount="reviews.length" />
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
  components: { ReviewCards, WebsiteDisplay }
}
</script>

<style scoped>
.specific-website {
  display: flex;
  flex-direction: column;
}

.website-panel {
  height: 50%;
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

<style>
.specific-website-container img {
  width: 30%;
  margin: auto 0;
}
@media screen and (max-width: 600px) {
  .specific-website {
    flex-direction: column;
  }
  .specific-website-container {
    flex-direction: column;
  }
  .content-box {
    flex: auto;
  }
  .specific-website-container img {
    margin: 0 auto;
    width: 50%;
    margin-bottom: 2rem;
  }
}
</style>
