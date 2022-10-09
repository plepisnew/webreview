<template>
  <div class="h-50 d-flex justify-content-between align-items-start">
    <MongoImage
      height="90%"
      width="auto"
      radius="10px"
      :src="website.logoSrc"
    />
    <div class="website-content p-3 mx-2 text-light">
      <a class="font-weight-bold mr-2" :href="website.url">
        {{ website.name }}</a
      >
      <p>{{ website.description }}</p>
      <p>
        Average Rating:
        <span v-for="star in Math.round(website.averageRating)" :key="star"
          >&#11088;</span
        >
      </p>
      <p>Number of Reviews: {{ reviewCount }}</p>
      <p>On WebReview since {{ getTime(website.createdAt) }}</p>
    </div>
  </div>
</template>

<script>
import MongoImage from './MongoImage.vue'
import { date } from '@/utils/parseTime'
export default {
  name: 'WebsiteDisplay',
  props: {
    website: {
      type: Object,
      required: true
    },
    reviewCount: {
      type: Number,
      required: true
    }
  },
  methods: {
    getTime(createdAt) {
      return date(createdAt)
    }
  },
  components: { MongoImage }
}
</script>

<style>
.specific-website .review-card a img {
  display: none;
}

.specific-website .review-card {
  border-radius: 10px;
  height: max-content;
}
</style>

<style scoped>
.website-content {
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  background-color: rgb(50, 50, 50);
}

.website-content {
}

.website-link {
}

.website-description {
}

.website-date {
}
</style>
