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
