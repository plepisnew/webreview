<template>
  <div class="review-card">
    <router-link :to="`/websites/${website.name}`.toLowerCase()">
      <MongoImage :src="website.logoSrc" width="auto" rounded />
    </router-link>
    <div class="review-info">
      <p class="review-meta">
        <MongoImage
          class="rounded-circle"
          :src="writtenBy.profilePictureSrc"
          :height="20"
          width="auto"
        />&nbsp;<router-link :to="`/profile/${writtenBy.username}`">
          <span class="username-span">{{ writtenBy.username }}</span>
        </router-link>
        rated
        <a :href="website.url" target="_blank">
          <span class="website-span">{{ website.name }}</span>
        </a>
        <span :class="`rating-span star-${rating}`">
          {{ rating }} star{{ rating === 1 ? '' : 's' }}
        </span>
        <span class="date-span">{{ getTime(createdAt) }}:</span>
      </p>
      <div class="content-scrollbar">
        <p class="review-content">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import MongoImage from '../MongoImage.vue'
export default {
  name: 'ReviewCard',
  props: {
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    writtenBy: {
      type: Object,
      required: true
    },
    website: {
      type: Object,
      required: true
    }
  },
  methods: {
    getTime(isoString) {
      const dt = Date.now() - new Date(isoString).getTime()
      const seconds = Math.floor(dt / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`
      }
      if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
      }
      if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`
      }
      return `${days} day${days === 1 ? '' : 's'} ago`
      //   const date = obj.getDate()
      //   return ` ${obj.toLocaleTimeString()} on ${date}${
      //     date === 1 ? 'st' : date === 2 ? 'nd' : date === 3 ? 'rd' : 'th'
      //   } of ${obj.toLocaleString('default', {
      //     month: 'long'
      //   })}, ${obj.getFullYear()}`
    }
  },
  components: { MongoImage }
}
</script>

<style>
.review-card {
  background: rgb(20, 20, 20);
  border-radius: 2000px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  display: flex;
  height: 100px;
  align-items: flex-start;
}

.review-card a {
  height: 100%;
}

.review-info {
  padding: 8px;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.review-meta,
.review-content {
  margin-bottom: 0;
  font-size: 14px;
}

.review-content {
  font-size: 14px;
}

.username-span,
.website-span,
.date-span {
  font-weight: 600;
}

.content-scrollbar {
  overflow-y: scroll;
}

.star-1 {
  color: red;
}
.star-2 {
  color: orange;
}
.star-3 {
  color: yellow;
}
.star-4 {
  color: lime;
}
.star-5 {
  color: green;
}
</style>
