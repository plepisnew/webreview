<template>
  <div class="profile auth">
    <div class="profile-container">
      <h5 class="font-weight-bold">{{ username }}</h5>
      <MongoImage
        class="rounded-circle"
        :src="'123'"
        :height="200"
        width="auto"
      />
      <b-form-file
        accept=".jpg, .png"
        v-if="ownPage"
        v-model="file"
        :state="Boolean(file)"
        class="mt-2 w-75"
      ></b-form-file>
      <b-button
        variant="primary"
        v-if="ownPage && file"
        v-on:click="saveImage()"
        class="mt-3"
      >
        <b-icon icon="check-square" aria-hidden="true"></b-icon> Save
      </b-button>
    </div>
    <div class="about-container mt-3">
      <h5 class="font-weight-bold">
        Member since: {{ createdAt.substring(0, 10) }}
      </h5>
      <h5 v-if="ownPage" class="font-weight-bold">About me</h5>
      <h5 v-if="!ownPage" class="font-weight-bold">About {{ username }}</h5>
      <b-form-textarea
        rows="3"
        max-rows="6"
        style="resize: none"
        v-if="ownPage"
        id="textarea"
        v-model="description"
        class="textarea"
      >
        {{ description }}
      </b-form-textarea>
      <b-form-textarea
        rows="3"
        max-rows="6"
        v-if="!ownPage"
        id="textarea"
        v-model="description"
        readonly="readonly"
        class="textarea"
      >
        {{ description }}
      </b-form-textarea>
      <b-button
        variant="primary"
        v-if="ownPage"
        v-on:click="saveDescription()"
        class="mt-2"
      >
        <b-icon icon="check-square" aria-hidden="true"></b-icon> Save
      </b-button>
    </div>
    <div class="review-container">
      <h2 class="reviews-title">{{ username }}'s reviews</h2>
      <div class="review-scrollbar">
        <ReviewCards :reviews="reviews" />
      </div>
    </div>
  </div>
</template>
<script>
import { Api } from '@/Api'
import ReviewCards from '@/components/reviews/ReviewCards.vue'
import Swal from 'sweetalert2'
import parseJWT from '@/utils/parseJWT.js'
import MongoImage from '@/components/MongoImage'

export default {
  name: 'profile',
  components: {
    ReviewCards,
    MongoImage
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
      const formData = new FormData()
      console.log(this.file)
      formData.append('uploadImage', this.file)
      formData.append('name', this.username)
      Api.post('/images/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          name: this.username
        }
      })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Image saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    async recentReviews() {
      const res = await Api.get(`/reviews/?username=${this.username}`)
      this.reviews = res.data.sort((r1, r2) => {
        const firstDate = new Date(r1.createdAt)
        const secondDate = new Date(r2.createdAt)
        if (firstDate > secondDate) return -1
        if (firstDate < secondDate) return 1
        return 0
      })
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
    async loadData() {
      const user = parseJWT(localStorage.getItem('token'))
      this.id = user._id
      if (
        this.$route.params.username === 'me' ||
        this.$route.params.username === user.username
      ) {
        Api.get(`/users/${this.id}`)
          .then(response => {
            const {
              username,
              description,
              createdAt
            } = response.data
            this.username = username
            this.description = description
            this.ownPage = true
            this.createdAt = createdAt
            this.profilePictureSrc = this.username
            this.recentReviews()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        if (this.$route.params.username) {
          this.id = this.$route.params.username
          Api.get(`/users/?username=${this.id}`)
            .then(response => {
              if (response.data.length === 0) {
                Swal.fire({
                  title: 'Page not found',
                  text: 'No user with that name',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                })
                this.$router.push('/')
              } else {
                const {
                  username,
                  description,
                  createdAt
                } = response.data[0]
                console.log(response)
                this.username = username
                this.description = description
                this.createdAt = createdAt
                this.profilePictureSrc = this.username
                this.recentReviews()
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  },
  async created() {
    await this.loadData()
    // await this.recentReviews()
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
  margin-top: 0;
}

.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: auto;
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

.textarea {
  height: 500px;
  margin: 1rem;
}
</style>
