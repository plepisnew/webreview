<template>
  <div class="profile">
    <div class="profile-and-about">
      <div v-if="profilePictureSrc" class="profile-container">
        <h5 class="font-weight-bold">{{ username }}</h5>
        <ProfilePicture
          class="rounded-circle"
          :src="profilePictureSrc"
          :dimensions="200"
        />
        <b-form-file
          v-if="ownPage"
          accept=".jpg, .png"
          v-visible="ownPage"
          v-model="file"
          :state="Boolean(file)"
          class="mt-2 w-75"
        />
        <b-button
          variant="primary"
          v-if="ownPage && file"
          v-on:click="saveImage()"
          class="mt-3"
        >
          <b-icon icon="check-square" aria-hidden="true"></b-icon> Save
        </b-button>
      </div>
      <div class="about-container">
        <h5 class="font-weight-bold">
          Member since: {{ getSince(createdAt) }}
        </h5>
        <h5 class="font-weight-bold">About {{ ownPage ? 'me' : username }}</h5>
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
          style="resize: none"
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
          class="mt-2 ml-auto"
        >
          <b-icon icon="check-square" class="" aria-hidden="true"></b-icon> Save
        </b-button>
      </div>
    </div>
    <div class="review-container mt-4">
      <h2 class="reviews-title">{{ username }}'s reviews</h2>
      <div class="review-scrollbar">
        <ReviewCards :reviews="reviews" />
      </div>
    </div>
  </div>
</template>
<script>
import { Api } from '@/Api'
import { descending } from '@/utils/sortChrono'
import ReviewCards from '@/components/reviews/ReviewCards.vue'
import Swal from 'sweetalert2'
import parseJWT from '@/utils/parseJWT.js'
import ProfilePicture from '../components/ProfilePicture.vue'
import { date } from '@/utils/parseTime'

export default {
  name: 'profile',
  components: {
    ReviewCards,
    ProfilePicture
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
    async saveImage() {
      try {
        const formData = new FormData()
        formData.append('uploadImage', this.file)
        formData.append('name', this.username)
        await Api.post('/images/pfp', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: {
            name: this.username
          }
        })
        await Swal.fire({
          icon: 'success',
          title: 'Image saved',
          showConfirmButton: false,
          timer: 1500
        })
        await Api.patch(`/users/${this.id}`, {
          profilePictureSrc: this.username
        })
        // TODO: navbar pfp is based on token which is static, so navbar pfp doesnt change. Reload the token after image upload
        window.location.reload()
      } catch (err) {
        console.error(err)
      }
    },
    async recentReviews() {
      const res = await Api.get(
        `/reviews/?username=${this.username}&isPending=false`
      )
      this.reviews = descending(res.data)
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
              createdAt,
              profilePictureSrc
            } = response.data
            this.username = username
            this.description = description
            this.ownPage = true
            this.createdAt = createdAt
            this.profilePictureSrc = profilePictureSrc
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
                  createdAt,
                  profilePictureSrc
                } = response.data[0]
                this.username = username
                this.description = description
                this.createdAt = createdAt
                this.profilePictureSrc = profilePictureSrc
                this.recentReviews()
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    },
    getSince(createdAt) {
      return date(createdAt)
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
h5 {
  font-size: 1.1rem;
}

.profile {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
}

.about-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reviews-title {
  height: 35px;
  margin: 0;
  font-size: 1.2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-and-about {
  display: flex;
  align-items: center;
  align-items: stretch;
  gap: 20px;
}

.review-scrollbar {
  max-height: 465px;
  padding: 15px;
  background: white;
  overflow-y: scroll;
  border-radius: 0 0 15px 15px;
}

.review-container {
  align-self: center;
  width: 100%;
  max-height: 500px;
  overflow: hidden;
  background: rgb(50, 50, 50);
  border-radius: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
}

.textarea {
  flex: 1;
  margin: 0.5rem;
}

@media screen and (max-width: 576px) {
  .profile-container {
    margin-top: 2rem;
  }
  .profile-and-about {
    display: flex;
    flex-direction: column;
  }

  .about-container {
    width: 100%;
  }
}
</style>
