<template>
  <div class="website-card">
    <a :href="this.url" target="_blank">
      <MongoImage :src="this.image" />
    </a>
    <div class="content-container">
      <span class="website-title"
        ><span style="margin-right: 5px;">{{ this.name }}</span>
        <span class="star-span" v-for="star in this.rating" :key="star"
          >&#11088;</span
        >
      </span>
      <span class="website-description">{{ this.description }}</span>
    </div>
  </div>
</template>

<script>
import MongoImage from './MongoImage.vue'
export default {
  name: 'WebsiteCard',
  components: {
    MongoImage
  },
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  },
  methods: {
    getStars(count) {}
  }
}
</script>

<style scoped>
.website-card {
  background-color: #424242;
  color: white;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
}

img {
  border-bottom: 1px solid #212121;
}

.star-span {
  font-size: 12px;
}

.website-card:active {
  box-shadow: none;
}

.website-title {
  font-weight: 700;
  font-size: 20px;
  line-height: normal;
  display: flex;
  align-items: center;
}

.website-description {
  font-weight: 500;
  font-size: 14px;
  line-height: normal;
}

.content-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>
