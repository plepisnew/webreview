
<template>
  <div class="page">
    <b-container class="profileContainer">
      <b-button variant="primary">Upload image</b-button>
      <b-card> Hello {{username}} </b-card>
      <b-card> Description: {{description}} </b-card>
      <b-card> Profile picture src: {{profilePictureSrc}} </b-card>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'profile',
  data() {
    return {
      username: '',
      description: '',
      profilePictureSrc: ''
    }
  },
  mounted() {
    Api.get('/users/') // 632c6af0b81e8921942bcb41/
      .then(response => {
        this.username = response.data.username
        this.description = response.data.description
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

</style>
