<template>
  <div id="app">
    <Navbar v-if="!['register', 'login'].includes(this.$route.name)" />
    <div
      :class="
        ['register', 'login'].includes(this.$route.name)
          ? 'unauth page'
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

*::-webkit-scrollbar {
  display: none;
}

a {
  color: inherit !important;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.navbar {
  height: 80px;
}

.page {
  width: 100%;
  height: calc(100vh - 80px);
  background: rgb(200, 200, 200);
  overflow-y: scroll;
}

.unauth {
  height: 100vh;
  background: rgb(33, 30, 30);
}

.auth {
  padding: 20px;
  margin-top: 80px;
  height: calc(100vh - 80px);
  background: rgb(200, 200, 200);
}

html {
  font-size: 1rem;
}

@media (min-width: 500px) {
  html {
    font-size: 0.8rem;
  }
}
@media (min-width: 800px) {
  html {
    font-size: 0.9rem;
  }
}
@media (min-width: 1000px) {
  html {
    font-size: 0.95rem;
  }
}
@media (min-width: 1200px) {
  html {
    font-size: 1rem;
  }
}
</style>
