<template>
  <div class="home-container">
    <div class="left-panel">
      <FilterBar />
    </div>
    <div class="right-panel">
      <div class="website-container">
        <h2 class="websites-title">
          Top rated websites
        </h2>
        <div class="website-scrollbar">
          <WebsiteCards :websites="websites" :cols="4" />
        </div>
      </div>
      <div class="review-container">
        <h2 class="reviews-title">Recent reviews</h2>
        <div class="review-scrollbar">
          <ReviewCards :reviews="reviews" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Button from '@/components/Button'
// import MongoImage from '@/components/MongoImage.vue'
// import TextField from '@/components/TextField.vue'
import FilterBar from '@/components/FilterBar.vue'
import WebsiteCards from '@/components/websites/WebsiteCards.vue'
import ReviewCards from '@/components/reviews/ReviewCards.vue'
import { Api } from '@/Api'

export default {
  name: 'home',
  components: {
    // Button,
    // MongoImage,
    // TextField,
    FilterBar,
    WebsiteCards,
    ReviewCards
  },
  data() {
    return {
      websites: [],
      reviews: []
    }
  },
  methods: {
    logTags(tags) {
      console.log(tags)
    },
    async recentReviews() {
      const reviews = await Api.get('/reviews')
      this.reviews = reviews.data.payload.sort(
        (r1, r2) => new Date(r1.createdAt) < new Date(r2.createdAt)
      )
      console.log(
        reviews.data.payload.sort(
          (r1, r2) =>
            new Date(r1.createdAt).getTime() > new Date(r2.createdAt).getTime()
        )
      )
    },
    async topWebsites() {
      const websites = await Api.get('/websites')
      this.websites = websites.data.map(website => {
        return { ...website, rating: 3 }
      })
    }
  },
  mounted() {
    this.recentReviews()
    this.topWebsites()
  }
}
</script>

<style>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
}

.left-panel,
.right-panel {
  /* flex: 1; */
  width: 50%;
  /* border-radius: 15px; */
  display: flex;
  flex-direction: column;
}

.website-container,
.review-container {
  flex: 1;
  height: 40%;
  background: rgb(50, 50, 50);
  /* padding: 10px 5px; */
  margin: 5px;
  border-radius: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.website-scrollbar,
.review-scrollbar {
  max-height: 90%;
  padding: 15px;
  overflow-y: scroll;
  background: white;
  border-radius: 0 0 15px 15px;
}

.review-container {
  flex: 1;
}

.websites-title,
.reviews-title {
  padding: 5px;
  margin: 0;
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
}
</style>
