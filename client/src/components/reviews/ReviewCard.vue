<template>
  <div v-if="website && user" class="review-card">
    <router-link :to="`/websites/${website.name}`">
      <MongoImage :src="website.logoSrc" width="auto" rounded />
    </router-link>
    <div class="review-info">
      <p class="review-meta">
        <router-link :to="`/users/${user.username}`">
          <span class="username-span">{{ user.username }}</span>
        </router-link>
        rated
        <a :href="website.url" target="_blank">
          <span class="website-span">{{ website.name }}</span>
        </a>
        <span :class="`rating-span star-${rating}`">
          {{ rating }} star{{ rating === 1 ? '' : 's' }}</span
        >
        at <span class="date-span">{{ getTime(createdAt) }}:</span>
      </p>
      <div class="content-scrollbar">
        <p class="review-content">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import MongoImage from '@/components/MongoImage'
import { Api } from '@/Api'
export default {
  name: 'ReviewCard',
  props: {
    content: {
      type: String,
      required: true
    },
    url: {
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
      type: String,
      required: true
    }
  },
  data() {
    return {
      website: undefined,
      user: undefined
    }
  },
  methods: {
    getTime(isoString) {
      const obj = new Date(isoString)
      const date = obj.getDate()
      return ` ${obj.toLocaleTimeString()} on ${date}${
        date === 1 ? 'st' : date === 2 ? 'nd' : date === 3 ? 'rd' : 'th'
      } of ${obj.toLocaleString('default', {
        month: 'long'
      })}, ${obj.getFullYear()}`
    }
  },
  components: { MongoImage },
  async mounted() {
    const website = (await Api.get(`/websites?url=${this.url}`)).data[0]
    this.website = website
    const user = (await Api.get(`/users/${this.writtenBy}`)).data.payload
    this.user = user
  }
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
