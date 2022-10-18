<template>
  <div class="specific-website-container mb-2">
    <MongoImage
      height="100%"
      width="auto"
      radius="10px"
      :src="website.logoSrc"
    />
    <div class="content-box">
      <a class="font-weight-bold" :href="website.url"> {{ website.name }}</a>
      <p>{{ website.description }}</p>
      <p>
        Average Rating:
        <span v-for="star in Math.round(website.averageRating)" :key="star"
          >&#11088;</span
        >
      </p>
      <p>Number of Reviews: {{ reviewCount }}</p>
      <p>On WebReview since {{ getTime(website.createdAt) }}</p>
      <div>
        <Button
          text="Add Review"
          variant="green"
          :onClick="() => $bvModal.show('review-form-modal')"
        />

        <b-modal
          id="review-form-modal"
          :title="`${website.name} Review Form`"
          header-bg-variant="dark"
          header-text-variant="light"
          body-bg-variant="dark"
          body-text-variant="light"
          footer-bg-variant="dark"
          footer-text-variant="light"
          hide-footer
        >
          <div class="review-form m-2 d-flex flex-column">
            <p class="mb-1">Review content</p>
            <textarea
              class="text-area"
              placeholder="I liked it"
              v-model="content"
              rows="5"
            />
            <div class="rating-input d-inline-flex align-items-center mt-2">
              <p class="mb-0 mr-2">Rating</p>
              <span
                v-for="i in 5"
                :key="i"
                :style="i > rating ? 'opacity: 0.5;' : ''"
                @click="
                  () => {
                    rating = i
                  }
                "
                >&#11088;</span
              >
            </div>
          </div>
          <div class="m-2 d-flex justify-content-end">
            <Button
              text="Cancel"
              variant="red"
              :onClick="() => $bvModal.hide('review-form-modal')"
            />
            <Button
              class="ml-2"
              text="Submit"
              variant="green"
              :onClick="submitReview"
            />
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import MongoImage from './MongoImage.vue'
import { Api } from '@/Api'
import { date } from '@/utils/parseTime'
import Button from './Button.vue'
import Swal from 'sweetalert2'
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
  data() {
    return {
      content: '',
      rating: 3
    }
  },
  methods: {
    getTime(createdAt) {
      return date(createdAt)
    },
    async submitReview(e) {
      try {
        await Api.post('/reviews', {
          rating: this.rating,
          content: this.content,
          website: this.website.name
        })
        this.$bvModal.hide('review-form-modal')
        await Swal.fire({
          title: 'Review Created',
          text:
            'Your Review has been successfully created! Please wait for an admin to approve it.',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: { MongoImage, Button }
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
.content-box {
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  background-color: rgb(50, 50, 50);
  flex: 1;
  padding: 1rem;
  margin: 0 0.5rem;
  color: white;
}

.text-area {
  padding: 2px 5px;
  border: none;
  border-radius: 5px;
  outline: none;
}

.rating-input span {
  cursor: pointer;
  font-size: 1.5rem;
}

.review-form p {
  font-size: 1.2rem;
  font-weight: 600;
}
.specific-website-container {
  display: flex;
  height: 40%;
}
</style>
