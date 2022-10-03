<template>
  <div class="home-container">
    <div class="left-panel">
      <h2 class="search-title">Search for Reviews:</h2>
      <FilterBar class="mb-3" :handler="searchByTags" />
      <div class="search-review-container">
        <div
          v-if="!!filteredReviews && filteredReviews.length > 0"
          class="search-review-scrollbar"
        >
          <ReviewCards :reviews="filteredReviews" />
        </div>
        <div
          v-else-if="filteredReviews && filteredReviews.length === 0"
          style="color: white;"
        >
          Couldn't find any reviews &#128557; Please try again with different
          tags
        </div>
      </div>
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
    </div></div
></template>

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
  props: {
    recentReviewCount: {
      type: Number,
      default: 10
    },
    topWebsiteCount: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      websites: [],
      reviews: [],
      allReviews: [],
      filteredReviews: undefined
    }
  },
  methods: {
    async searchByTags(tags) {
      const res = await Api.get('/reviews/inflate')
      if (tags.includes('all')) {
        this.filteredReviews = res.data.payload
        return
      }
      this.filteredReviews = res.data.payload.filter(review => {
        const reviewData = [
          review.content,
          review.createdAt,
          `${review.rating} stars`,
          JSON.stringify(review.website),
          review.writtenBy.username
        ]
          .join(' ')
          .toLowerCase()
        for (let tag = 0; tag < tags.length; tag++) {
          if (reviewData.includes(tags[tag].toLowerCase())) {
            return true
          }
        }
        return false
      })
    },
    async recentReviews() {
      const res = await Api.get('/reviews/inflate')
      this.reviews = res.data.payload
        .sort((r1, r2) => {
          const firstDate = new Date(r1.createdAt)
          const secondDate = new Date(r2.createdAt)
          if (firstDate > secondDate) return -1
          if (firstDate < secondDate) return 1
          return 0
        })
        .slice(0, this.recentReviewCount)
    },
    async topWebsites() {
      const res = await Api.get('/websites')
      const promises = res.data.map(async website => {
        return {
          website,
          reviews: (await Api.get(`/websites/${website._id}/reviews`)).data
        }
      })
      const items = await Promise.all(promises)
      this.websites = items
        .map(item => {
          const averageRating =
            item.reviews.reduce(
              (previousRating, currentItem) =>
                previousRating + currentItem.rating,
              0
            ) / item.reviews.length
          return { ...item.website, rating: Math.floor(averageRating) }
        })
        .sort((w1, w2) => {
          if (w1.rating > w2.rating) return -1
          if (w1.rating < w2.rating) return 1
          return 0
        })
        .slice(0, this.topWebsiteCount)
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
  max-height: 100%;
  width: 50%;
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
  /* max-height: 80%; */
  height: 90%;
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

.search-review-container {
  background: rgb(50, 50, 50);
  padding: 10px;
  /* flex: 1; */
  /* display: flex; */
  max-height: calc(100% - 150px);
  border-radius: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
}

.search-review-container:empty {
  display: none;
}

.search-review-scrollbar {
  height: 100%;
  overflow-y: scroll;
}
</style>
