<template>
  <div class="review-cards">
    <div v-for="review in reviews" :key="review.createdAt">
      <ReviewCard
        :review="review"
        :deleteReview="deleteReview"
        :approveReview="approveReview"
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
    },
    deleteReview: {
      type: Function,
      required: false
    },
    approveReview: {
      type: Function,
      required: false
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
