<template>
  <div
    class="website-cards"
    :style="`grid-template-columns: repeat(${cols}, 1fr)`"
  >
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
.website-cards {
  display: grid;
  column-gap: 10px;
  row-gap: 10px;
}
</style>
