<template>
  <div class="profile">
    <div class="profile-container">
      <h5 class="font-weight-bold">{{ username }}</h5>
      <b-img
        class="w-50"
        src="/images/profile_default.png"
        alt="Your profile image"
      ></b-img>
      <b-button class="mt-2" variant="primary"><b-icon icon="upload" aria-hidden="true"></b-icon> Upload photo</b-button>
      <br />
    </div>
    <div class="about-container">
      <h5 class="font-weight-bold">About me</h5>
      <b-form-textarea
        id="textarea"
        v-model="description"
        class="w-50 rounded-top w-100 h-100">
        {{ description }}
      </b-form-textarea>
      <b-button variant="primary" v-on:click="saveDescription()" class="mt-2">
        <b-icon icon="check-square" aria-hidden="true"></b-icon> Save
      </b-button>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

import Swal from 'sweetalert2'

export default {
  name: 'profile',
  data() {
    return {
      username: '',
      description: '',
      profilePictureSrc: '',
      id: ''
    }
  },
  mounted() {
    const userId = localStorage.getItem('userId')
    Api.get(`/users/${userId}`)
      .then(response => {
        this.username = response.data.payload.username
        this.description = response.data.payload.description
        this.profilePictureSrc = response.data.payload.profilePictureSrc
        this.id = response.data.payload._id
      })
      .catch(error => {
        console.log(error)
      })
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
    }
  }
}
</script>

<style>
.profile {
  display: flex;
}

.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 20%;
  left: 35%;
  height: 20vh;
  width: 30vw;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 20%;
  left: 15%;
}
</style>
