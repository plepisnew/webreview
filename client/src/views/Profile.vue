
<template>
  <div class="page profile">
    <div class="profile-container">
      <h5 class="font-weight-bold">{{username}} </h5>
      <b-img class="w-50" src="/images/profile_default.png" alt="Your profile image"></b-img>
      <br>
      <b-button variant="primary" size="sm" class="mt-2">Upload photo</b-button>
    </div>
    <div class="about-container">
      <h5 class="font-weight-bold">About me</h5>
      <b-form-textarea
        id="textarea"
        v-model="description"
        class="w-50 rounded-top w-100 h-100"
      >      {{description}}  </b-form-textarea>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'profile',
  data() {
    return {
      username: 'USERNAME',
      description: 'Write something about yourself...',
      profilePictureSrc: ''
    }
  },
  mounted() {
    Api.get('/users/') // 632f32e8c4b6624870da28f3
      .then(response => {
        if (this.username.length > 0) {
          this.username = response.data.username
        }
        if (this.description.length > 0) {
          this.description = response.data.description
        }
        this.profilePictureSrc = response.data.profilePictureSrc
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
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
