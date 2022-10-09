<template>
  <b-navbar type="dark" fixed="top" variant="dark">
    <b-navbar-brand to="/">
      <MongoImage
        src="webreview_landscape"
        :height="50"
        width="auto"
        style="border-radius: 15px"
      />
    </b-navbar-brand>
    <b-nav-text class="m-auto h4">Welcome, {{ username }}!</b-nav-text>
    <b-navbar-nav class="navigation">
      <b-nav-item class="my-auto" to="/websites">Websites</b-nav-item>
      <b-nav-item class="my-auto" to="/profile/me">
        <MongoImage
          :src="pfp"
          :width="50"
          style="border-radius: 50%; border: 1px solid black;"
        />
      </b-nav-item>
      <i
        class="fa-solid fa-xl fa-right-from-bracket"
        style="color: white; cursor: pointer;"
        @click="signOut"
      ></i>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import MongoImage from './MongoImage.vue'
import parseJWT from '@/utils/parseJWT.js'

export default {
  name: 'navbar',
  data() {
    return {
      username: '',
      pfp: ''
    }
  },
  methods: {
    signOut() {
      localStorage.token = ''
      this.$router.push('/login')
      //   location.href = '/login'
    }
  },
  created() {
    const user = parseJWT(localStorage.token)
    this.username = user.username
    this.pfp = user.profilePictureSrc
  },
  components: { MongoImage }
}
</script>

<style>
.navigation {
  align-items: center;
  color: white;
}

.router-link-exact-active {
  color: white;
}
.navbar-light .navbar-nav .nav-link {
  color: black;
}
</style>
