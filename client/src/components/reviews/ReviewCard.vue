<template>
  <div class="review-card">
    <router-link
      class="website-link mr-1"
      :to="`/websites/${website.name}`.toLowerCase()"
    >
      <MongoImage :src="website.logoSrc" rounded />
    </router-link>
    <div class="review-info">
      <p class="review-meta">
        <ProfilePicture
          class="rounded-circle"
          :src="writtenBy.profilePictureSrc"
          :dimensions="20"
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
        <p :class="`review-content py-1 ${content ? '' : 'font-italic'}`">
          {{ content ? `"${content}"` : 'No Content' }}
        </p>
      </div>
    </div>
    <!-- deleteReview(review.id) -->
    <div class="admin-controls">
      <span v-if="deleteReview" @click="() => deleteReview(review._id)">
        <i class="fa-solid fa-trash"></i
      ></span>
      <span v-if="approveReview" @click="() => approveReview(review._id)"
        ><i class="fa-solid fa-thumbs-up"></i
      ></span>
    </div>
  </div>
</template>

<script>
import MongoImage from '../MongoImage.vue'
import { timePassed } from '@/utils/parseTime'
import ProfilePicture from '../ProfilePicture.vue'

export default {
  name: 'ReviewCard',
  props: {
    review: {
      type: Object,
      required: true
    },
    deleteReview: {
      type: Function,
      required: false
    },
    approveReview: {
      type: Function,
      requireD: false
    }
  },
  data() {
    return {
      content: {
        type: String
      },
      isPending: {
        type: Boolean
      },
      rating: {
        type: Number
      },
      createdAt: {
        type: String
      },
      writtenBy: {
        type: Object
      },
      website: {
        type: Object
      }
    }
  },
  created() {
    const {
      content,
      isPending,
      rating,
      createdAt,
      writtenBy,
      website
    } = this.review
    this.content = content
    this.isPending = isPending
    this.rating = rating
    this.createdAt = createdAt
    this.writtenBy = writtenBy
    this.website = website
  },
  components: { MongoImage, ProfilePicture },
  methods: {
    getTime(time) {
      return timePassed(time)
    }
  }
}
</script>

<style>
.review-card {
  position: relative;
  background: rgb(20, 20, 20);
  border-radius: 100px 15px 15px 100px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  display: flex;
  min-height: 80px;
  height: 6vw;
}

.website-link {
  height: 100%;
}

.website-link img {
  height: 100%;
  width: auto;
}

.date-span {
  display: none;
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
  font-size: 0.875rem;
}

.review-content {
  font-size: 0.875rem;
  font-weight: 300;
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

.admin-controls {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  /* background: black; */
}

.fa-thumbs-up {
  color: green;
}

.fa-trash {
  color: red;
}

.fa-solid {
  cursor: pointer;
  margin: 3px 4px;
}
</style>
