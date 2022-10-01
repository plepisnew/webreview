<template>
  <b-navbar class="navbar" type="dark" fixed="top" variant="dark">
    <b-navbar-brand to="/">
      <MongoImage src="twitch" :width="50" style="border-radius: 10%;" />
      <b-nav-text class="mx-3 font-weight-bold">WebReview</b-nav-text>
    </b-navbar-brand>
    <b-nav-text class="m-auto h4">For all your reviewing needs</b-nav-text>
    <b-navbar-nav class="navigation">
      <b-nav-item class="my-auto" to="/websites">Websites</b-nav-item>
      <b-nav-item class="my-auto" to="/reviews">Reviews</b-nav-item>
      <b-nav-item class="my-auto" to="/profile/me">
        <MongoImage
          src="barox"
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
export default {
  name: 'navbar',
  methods: {
    signOut() {
      localStorage.token = ''
      this.$router.push('/login')
    }
  },
  components: { MongoImage }
}
</script>

<style>
.navigation {
  align-items: center;
}

.router-link-exact-active {
  color: white;
}
.navbar-light .navbar-nav .nav-link {
  color: black;
}
</style>
