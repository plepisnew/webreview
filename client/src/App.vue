<template>
  <div id="app">
    <Navbar v-if="!['register', 'login'].includes(this.$route.name)" />
    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
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

.page,
.unauth-page {
  margin-top: 80px;
  padding: 30px;
  width: 100%;
  height: 100%;
  background: rgb(200, 200, 200);
}

.page {
  top: 80px;
}

.unauth-page {
  top: 0;
}
</style>
