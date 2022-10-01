<template>
  <div class="review-cards">
    <div v-for="review in reviews" :key="review.id">
      <ReviewCard
        :content="review.content"
        :url="review.url"
        :rating="review.rating"
        :createdAt="review.createdAt"
        :writtenBy="review.writtenBy"
      />
    </div>
  </div>
</template>

<script>
import ReviewCard from './ReviewCard.vue'
export default {
  name: 'ReviewCards',
  components: { ReviewCard },
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.review-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
