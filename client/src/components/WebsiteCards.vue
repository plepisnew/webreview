<template>
  <div class="website-cards">
    <div v-for="website in websites" :key="website.name">
      <WebsiteCard
        :name="website.name"
        :description="website.description"
        :url="website.url"
        :image="website.image"
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
    }
  },
  components: { WebsiteCard }
}
</script>

<!-- set your own width and add responsiveness to change grid templating -->
<style>
.website-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 900px;
  column-gap: 10px;
  row-gap: 10px;
}
</style>
