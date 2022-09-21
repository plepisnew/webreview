<template>
  <div id="app">
    <Navbar v-if="!['register', 'login'].includes(this.$route.name)" />

    <router-view />
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
}

.page,
.unauth-page {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 30px;
  background: rgb(200, 200, 200);
}

.page {
  top: 80px;
}

.unauth-page {
  top: 0;
}
</style>
