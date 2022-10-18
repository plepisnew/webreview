<template>
  <div class="management">
    <div class="data-panel">
      <div class="panel" style="height: max-content;">
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
            <span class="key-text">Registered Websites:</span>
            {{ websiteCount }}
          </p>
          <p class="panel-text">
            <span class="key-text">Written Reviews:</span>
            {{ reviewCount[0] }}
            <span v-for="rating in 5" :key="rating" :class="`star-${rating}`">
              {{ reviewCount[rating] }}
            </span>
          </p>
          <p class="panel-text">
            <span class="key-text">Last Review: </span>
            {{ lastReview || 'never' }}
          </p>
          <p class="panel-text">
            <span class="key-text">First Review: </span>
            {{ firstReview || 'never' }}
          </p>
          <p class="panel-text">
            <span class="key-text">Average Review Rate: </span>
            {{ averageReviews || '0 reviews/day' }}
          </p>
        </div>
      </div>
      <div class="panel">
        <div class="title-container">
          <p class="panel-title">Create Website:</p>
        </div>
        <div class="content-container website-content">
          <div
            class="d-flex flex-column align-items-center justify-content-start"
            style="gap: 0.7rem;"
          >
            <img class="website-logo" :src="websiteLogo" />
            <b-form-file
              accept=".jpg, .png"
              v-model="website.image"
              :state="Boolean(website.image)"
              class="w-75"
              @change="e => setWebsiteLogo(e)"
            />
          </div>
          <div class="text-container">
            <TextField
              placeholder="Name"
              :input="e => updateName(e.target.value)"
            />
            <textarea
              class="text-field"
              placeholder="Description"
              rows="4"
              @input="e => updateDescription(e.target.value)"
            ></textarea>
            <TextField
              placeholder="URL"
              :input="e => updateUrl(e.target.value)"
            />
            <Button
              text="Add Wesbite"
              :onClick="createWebsite"
              variant="green"
              :disabled="
                !(
                  website.name &&
                  website.description &&
                  website.url &&
                  website.image
                )
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="user-panel panel">
      <div class="title-container">
        <p class="panel-title">Manage Users:</p>
      </div>
      <TextField
        placeholder="Filter Users"
        class="mb-2"
        :input="e => filterUsers(e)"
      />
      <div class="content-container user-container">
        <UserCards :users="filteredUsers" />
      </div>
    </div>
    <div class="review-panel panel">
      <div class="title-container">
        <p class="panel-title d-inline mr-2">Pending Reviews:</p>
      </div>
      <div class="content-container review-container">
        <ReviewCards
          :reviews="reviews"
          :deleteReview="deleteReview"
          :approveReview="approveReview"
        />
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
import TextField from '../components/TextField.vue'
import Button from '../components/Button.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Management',
  data() {
    return {
      userCount: 0,
      adminCount: 0,
      websiteCount: 0,
      reviewCount: [0, 0, 0, 0, 0, 0],
      reviews: [],
      users: [],
      filteredUsers: [],
      lastReview: '',
      firstReview: '',
      averageReviews: '',
      website: {
        name: '',
        description: '',
        url: '',
        image: null
      },
      websiteLogo: null
    }
  },
  methods: {
    setWebsiteLogo(e) {
      this.websiteLogo = URL.createObjectURL(e.target.files[0])
    },
    async deleteReview(id) {
      this.reviews = this.reviews.filter(review => review._id !== id)
      await Api.delete(`/reviews/${id}`)
    },
    async approveReview(id) {
      this.reviews = this.reviews.filter(review => review._id !== id)
      await Api.patch(`/reviews/${id}`, { isPending: false })
    },
    filterUsers(e) {
      this.filteredUsers = this.users.filter(user =>
        user.username.includes(e.target.value)
      )
    },
    async createWebsite() {
      try {
        const { name, url, description, image } = this.website
        const formData = new FormData()
        formData.append('uploadImage', image)
        formData.append('name', name.toLowerCase())
        await Api.post('/images/pfp', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        await Api.post('/websites', {
          name,
          url,
          description,
          logoSrc: name.toLowerCase()
        })
        await Swal.fire({
          icon: 'success',
          title: 'Website created!',
          showConfirmButton: false
        })
      } catch (err) {
        console.log(err)
      }
    },
    updateName(name) {
      this.website.name = name
    },
    updateDescription(description) {
      this.website.description = description
    },
    updateUrl(url) {
      this.website.url = url
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
    this.filteredUsers = this.users

    const websites = (await Api.get('/websites')).data
    this.websiteCount = websites.length

    const reviews = (await Api.get('/reviews')).data
    const reviewCount = [reviews.length, 0, 0, 0, 0, 0]

    this.reviews = descending(
      reviews.filter(review => {
        reviewCount[review.rating] += 1
        return review.isPending
      })
    )
    this.reviewCount = reviewCount

    if (reviews.length !== 0) {
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
    }
  },
  components: { UserCards, ReviewCards, TextField, Button }
}
</script>

<style scoped>
@media screen and (max-width: 1100px) {
  .data-panel {
    margin-bottom: 0.5rem;
  }
  .management {
    flex-direction: column;
  }
}
.website-content {
  display: flex;
  flex-direction: row;
}
.b-form-file {
  margin-bottom: 0.4rem;
}

@media screen and (max-width: 600px) {
  .website-content {
    flex-direction: column;
  }
}

.website-logo {
  border-radius: 15px;
  width: 75%;
}

.text-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-panel {
  display: flex;
  flex-direction: column;
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
