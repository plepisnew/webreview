<template>
  <div class="websites-page">
    <!-- d-flex-column justify-content-start align-items-center -->
    <h1 class="mb-3">
      Browse registered websites:
    </h1>
    <div class="website-container">
      <WebsiteCards :websites="websites" />
    </div>
  </div>
</template>

<script>
import { Api } from '../Api'
import WebsiteCards from '../components/websites/WebsiteCards.vue'

export default {
  name: 'websites',
  data() {
    return {
      websites: []
    }
  },
  async created() {
    const res = await Api.get('/websites')
    this.websites = res.data.map(website => {
      return {
        ...website.website,
        rating: website.averageRating
      }
    })
  },
  components: { WebsiteCards }
}
</script>

<style scoped>
h1 {
}

.websites-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.website-container {
  width: 95%;
  padding: 10px;
  background: rgb(30, 30, 30);
  border-radius: 15px;
}

@media screen and (max-width: 3000px) {
  .website-cards {
    grid-template-columns: repeat(8, 1fr);
  }
}
@media screen and (max-width: 1400px) {
  .website-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 1200px) {
  .website-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 800px) {
  .website-cards {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
