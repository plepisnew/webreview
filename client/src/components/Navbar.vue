<template>
  <b-navbar type="dark" fixed="top" variant="dark">
    <b-navbar-brand to="/">
      <MongoImage
        src="webreview_landscape"
        style="border-radius: 15px"
        class="header-img"
      />
    </b-navbar-brand>
    <b-nav-text class="m-auto h4 d-none d-sm-block">Welcome, {{ username }}!</b-nav-text>
    <b-navbar-nav class="navigation">
      <div class="header-links">
        <b-nav-item v-if="isAdmin" class="my-auto" to="/management"
        >Management</b-nav-item
        >
        <b-nav-item class="my-auto" to="/websites">Websites</b-nav-item>
      </div>
      <b-nav-item class="my-auto" to="/profile/me">
        <ProfilePicture
          :src="pfp"
          :dimensions="40"
          style="border-radius: 50%; "
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
import ProfilePicture from './ProfilePicture.vue'

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
    this.isAdmin = user.isAdmin
    this.username = user.username
    this.pfp = user.profilePictureSrc
  },
  components: { MongoImage, ProfilePicture }
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

.header-img {
  height: 60px;
  width: 170px;
}

.header-links {
  display: flex;
  flex-direction: row;
}

@media screen and (max-width: 510px) {

  .header-img {
    height: 40px;
    width: 120px;
  }
  .header-links {
    display: flex;
    flex-direction: column;
  }
}

</style>
