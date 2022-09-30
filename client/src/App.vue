<template>
  <div id="app">
    <Navbar v-if="!['register', 'login'].includes(this.$route.name)" />
    <div
      :class="
        ['register', 'login'].includes(this.$route.name)
          ? 'unauth-page'
          : 'auth page'
      "
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  mounted() {
    localStorage.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlUGljdHVyZVNyYyI6ImltYWdlcy9kZWZhdWx0X3VzZXJfaWNvbi5wbmciLCJkZXNjcmlwdGlvbiI6IkhlbGxvIE1vb24hIiwiZGlzYWJsZWRGb3IiOjAsIndyaXR0ZW5SZXZpZXdzIjpbXSwiX2lkIjoiNjMzNmU1MjZhZDY0NDEyMmMwYzE0OTc2IiwidXNlcm5hbWUiOiJhdXRoVXNlciIsInBhc3N3b3JkIjoiJDJiJDEwJDlQMC5QS3IwTG5xVkpCdnhSVm5vc09tajNvSVFyMlE0bGlhaUZ2NVc2R2JaUmJqSllxRURhIiwiY3JlYXRlZEF0IjoiMjAyMi0wOS0zMFQxMjo0NjozMC4xNjhaIiwidXBkYXRlZEF0IjoiMjAyMi0wOS0zMFQxMjo0NjozMC4xNjhaIiwiX192IjowLCJpYXQiOjE2NjQ1NDQ4NTB9.OAyO6N99Armvam5qBoZKahe5VNxrM2JSUwigsUdIGoA'
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.navbar {
  height: 80px;
}

.page {
  margin-top: 80px;
  padding: 30px;
  width: 100%;
  min-height: calc(100vh - 80px);
  background: rgb(200, 200, 200);
}

.unauth-page {
  width: 100%;
  height: 100vh;
  background: rgb(200, 200, 200);
}
</style>
