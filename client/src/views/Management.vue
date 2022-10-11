<template>
  <div class="management">
    <div class="data-panel panel">
      <div class="title-container">
        <p class="panel-title">WebReview Analytics:</p>
      </div>
      <div class="content-container">
        <p class="panel-text">
          <span class="key-text">Registered Users:</span> {{ userCount }}
        </p>
        <p class="panel-text">
          <span class="key-text">Regsitered Admins: </span> {{ adminCount }}
        </p>
        <p class="panel-text">
          <span class="key-text">Registered Websites:</span> {{ websiteCount }}
        </p>
        <p class="panel-text">
          <span class="key-text">Written Reviews:</span>
          {{ reviewCount[0] }}
          <span v-for="rating in 5" :key="rating" :class="`star-${rating}`">
            {{ reviewCount[rating] }}
          </span>
        </p>
        <!-- TODO: display more analytics/statistics -->
        <p class="panel-text">
          <span class="key-text">Last Review: </span> {{ lastReview }}
        </p>
        <p class="panel-text">
          <span class="key-text">First Review: </span> {{ firstReview }}
        </p>
        <p class="panel-text">
          <span class="key-text">Average Review Rate: </span>
          {{ averageReviews }}
        </p>
      </div>
    </div>
    <div class="user-panel panel">
      <div class="title-container">
        <p class="panel-title">Manage Users:</p>
      </div>
      <div class="content-container user-container">
        <UserCards :users="users" />
      </div>
    </div>
    <div class="review-panel panel">
      <div class="title-container">
        <p class="panel-title d-inline mr-2">Manage Reviews:</p>
        <span class="key-text"
          >(Only pending Reviews
          <input type="checkbox" @input="togglePending" />)</span
        >
      </div>
      <div class="content-container review-container">
        <ReviewCards :reviews="filteredReviews" />
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import { descending } from '@/utils/sortChrono'
import { timePassed, dt } from '@/utils/parseTime'
import roundFloat from '@/utils/roundFloat'
import UserCards from '../components/users/UserCards.vue'
import ReviewCards from '../components/reviews/ReviewCards.vue'

export default {
  name: 'Management',
  data() {
    return {
      userCount: 0,
      adminCount: 0,
      websiteCount: 0,
      reviewCount: [0, 0, 0, 0, 0, 0],
      showOnlyPending: false,
      reviews: [],
      filteredReviews: [],
      users: [],
      lastReview: '',
      firstReview: '',
      averageReviews: ''
    }
  },
  methods: {
    togglePending() {
      this.showOnlyPending = !this.showOnlyPending
      console.log(this.reviews)
      this.filteredReviews = this.reviews.filter(review =>
        this.showOnlyPending ? review.isPending : true
      )
    }
  },
  async created() {
    /* Initialize analytics */
    let adminCount = 0
    const users = (await Api.get('/users')).data
    users.forEach(user => (adminCount += user.isAdmin ? 1 : 0))
    this.userCount = users.length
    this.adminCount = adminCount
    this.users = descending(users)
    const websites = (await Api.get('/websites')).data
    this.websiteCount = websites.length
    const reviews = (await Api.get('/reviews')).data
    const reviewCount = [reviews.length, 0, 0, 0, 0, 0]
    reviews.forEach(review => {
      reviewCount[review.rating] += 1
    })
    this.reviewCount = reviewCount
    this.filteredReviews = descending(reviews)
    this.reviews = descending(reviews)
    const [lastDate, firstDate] = [
      reviews[0].createdAt,
      reviews[reviews.length - 1].createdAt
    ]
    this.lastReview = timePassed(lastDate)
    this.firstReview = timePassed(firstDate)
    const reviewDt = dt(lastDate, firstDate, 'day')
    this.averageReviews = `${roundFloat(
      reviewCount[0] / reviewDt,
      1
    )} reviews/day`
  },
  components: { UserCards, ReviewCards }
}
</script>

<style scoped>
@media screen and (max-width: 1100px) {
  .data-panel,
  .user-panel,
  .review-panel {
  }
  .management {
    flex-direction: column;
  }
}

.star-1::before {
  content: '(';
  color: white;
}
.star-1::after,
.star-2::after,
.star-3::after,
.star-4::after {
  content: '|';
  color: white;
}
.star-5::after {
  content: ')';
  color: white;
}
.user-container,
.review-container {
  height: 100%;
  overflow-y: scroll;
}
</style>

<style>
.management {
  height: 100%;
  display: flex;
}

.panel {
  background: rgb(30, 30, 30);
  height: 100%;
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}

.panel-title {
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0;
}

.panel-text {
  color: rgb(240, 240, 240);
  font-weight: 300;
  font-size: 1.1rem;
  margin-bottom: 0;
}

.key-text {
  color: rgb(240, 240, 240);
  font-weight: 500;
}

.title-container {
  border-bottom: 1px solid rgb(100, 100, 100);
  margin-bottom: 1rem;
}

.content-container {
  flex: 1;
}

.data-panel,
.user-panel,
.review-panel {
  flex: 1;
}
</style>
