<template>
  <div class="profile auth">
    <div class="profile-container">
      <h5 class="font-weight-bold">{{ username }}</h5>
      <b-img
        class="container-fluid w-50"
        src="/images/profile_default.png"
        alt="Your profile image"
      ></b-img>
      <b-form-file accept=".jpg, .png"
        v-if="ownPage"
        v-model="file"
        :state="Boolean(file)"
        class="mt-2 w-75"
      ></b-form-file>
      <b-button variant="primary" v-if="ownPage && file" v-on:click="saveImage()" class="mt-3">
        <b-icon icon="check-square" aria-hidden="true"></b-icon> Save
      </b-button>
    </div>
    <div class="about-container mt-3">
      <h5 class="font-weight-bold">Member since: {{createdAt.substring(0, 10)}}</h5>
      <h5 v-if="ownPage" class="font-weight-bold">About me</h5>
      <h5 v-if="!ownPage" class="font-weight-bold">About {{username}}</h5>
      <b-form-textarea rows="3"
                       max-rows="6" style="resize: none" v-if="ownPage"
        id="textarea"
        v-model="description"
        class="textarea">
        {{ description }}
      </b-form-textarea>
      <b-form-textarea rows="3" max-rows="6" v-if="!ownPage"
                       id="textarea"
                       v-model="description"
                       readonly="readonly"
                       class="textarea">
        {{ description }}
      </b-form-textarea>
      <b-button variant="primary" v-if="ownPage" v-on:click="saveDescription()" class="mt-2">
        <b-icon icon="check-square" aria-hidden="true"></b-icon> Save
      </b-button>
    </div>
    <div class="review-container">
      <div class="review-container">
        <h2 class="reviews-title">{{username}}'s reviews</h2>
        <div class="review-scrollbar">
          <ReviewCards :reviews="reviews"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Api } from '@/Api'
import ReviewCards from '@/components/reviews/ReviewCards.vue'
import Swal from 'sweetalert2'

export default {
  name: 'profile',
  components: {
    ReviewCards
  },
  data() {
    return {
      username: '',
      description: '',
      profilePictureSrc: '',
      id: '',
      ownPage: false,
      createdAt: '',
      file: null,
      reviews: []
    }
  },
  methods: {
    removeUser() {
      Api.delete(`/users/${this.id}`)
        .then(response => {
          this.$router.push('/login')
        })
        .catch(error => {
          console.error(error)
        })
    },
    saveImage() {
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
    saveDescription() {
      Api.patch(`/users/${this.id}`, { description: this.description })
        .then(response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Description saved!',
            showConfirmButton: false,
            timer: 1500,
            width: '24em'
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    parseJwt(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))

      return JSON.parse(jsonPayload)
    },
    loadData() {
      const user = this.parseJwt(localStorage.getItem('token'))
      this.id = user._id
      if (this.$route.params.username === 'me' || this.$route.params.username === user.username) {
        Api.get(`/users/${this.id}`)
          .then(response => {
            console.log(response)
            this.username = response.data.payload.username
            this.description = response.data.payload.description
            this.profilePictureSrc = response.data.payload.profilePictureSrc
            this.ownPage = true
            this.createdAt = response.data.payload.createdAt
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        if (this.$route.params.username) {
          this.id = this.$route.params.username
          Api.get(`/users/?username=${this.id}`)
            .then(response => {
              if (response.data.payload.length === 0) {
                Swal.fire({
                  title: 'Page not found',
                  text: 'No user with that name',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                })
                this.$router.push('/')
              } else {
                this.username = response.data.payload[0].username
                this.description = response.data.payload[0].description
                this.profilePictureSrc = response.data.payload[0].profilePictureSrc
                this.createdAt = response.data.payload[0].createdAt
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  },
  mounted() {
    this.loadData()
    this.recentReviews()
  },
  async created() {
    this.loadData()
    this.$watch(() => this.$route.params, this.loadData)
  }
}
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: auto;
  margin: 2rem;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.review-scrollbar {
  /* max-height: 80%; */
  height: 90%;
  padding: 15px;
  overflow-y: scroll;
  background: white;
  border-radius: 0 0 15px 15px;
}
.reviews-title {
  padding: 5px;
  margin: 0;
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
}

.review-container {
  flex: 1;
  width: 75vw;
  height: 100vh;
  height: 25vh;
  background: rgb(50, 50, 50);
  margin: 5px;
  border-radius: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

img {
}

.textarea {
  height: 500px;
  margin: 1rem;
}

</style>
