<template>
  <div class="website-cards">
    <div v-for="website in websites" :key="website.name">
      <WebsiteCard
        :name="website.name"
        :description="website.description"
        :url="website.url"
        :logoSrc="website.logoSrc"
        :rating="website.rating"
      />
    </div>
  </div>
</template>

<script>
import WebsiteCard from './WebsiteCard.vue'
export default {
  name: 'WebsiteCards',
  props: {
    websites: {
      type: Array,
      required: true
    },
    cols: {
      type: Number,
      default: 4
    }
  },
  components: { WebsiteCard }
}
</script>

<!-- set your own width and add responsiveness to change grid templating -->
<style>
@media screen and (max-width: 3000px) {
  .website-cards {
    grid-template-columns: repeat(4, 1fr);
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
/* @media screen and (min-width: 1500px) {
  .website-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media screen and (min-width: 1500px) {
  .website-cards {
    grid-template-columns: repeat(4, 1fr);
  }
} */

.website-cards {
  display: grid;
  column-gap: 10px;
  row-gap: 10px;
}
</style>
