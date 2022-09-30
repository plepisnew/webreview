<template>
  <div>
    <p>Home Page</p>
    <div
      style="display: flex; flex-direction: column; max-width: 400px; gap: 10px"
    >
      <Button text="press me ;)" :onClick="this.log" variant="red" />
      <Button
        text="OR alternatively press me ;)"
        :onClick="this.log"
        variant="blue"
      />
      <MongoImage src="barox" :width="80" />
      <TextField placeholder="Username" />
      <FilterBar class="mt-3" :handler="this.logTags" />
      <WebsiteCards :websites="websites" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import MongoImage from '@/components/MongoImage.vue'
import TextField from '@/components/TextField.vue'
import FilterBar from '@/components/FilterBar.vue'
import WebsiteCards from '../components/WebsiteCards.vue'

export default {
  name: 'home',
  components: {
    Button,
    MongoImage,
    TextField,
    FilterBar,
    WebsiteCards
  },
  data() {
    return {
      websites: [
        {
          name: 'YouTube',
          description: 'Video sharing and streaming platform',
          url: 'http://youtube.com',
          image: 'barox',
          rating: 5
        },
        {
          name: 'Twitch',
          description: 'Video sharing and streaming platform',
          url: 'http://twitch.tv',
          image: 'twitch',
          rating: 4
        },
        {
          name: 'TubeYou',
          description: 'Video sharing and streaming platform',
          url: 'http://youtube.com',
          image: 'barox',
          rating: 3
        },
        {
          name: 'MySpace',
          description: 'Video sharing and streaming platform',
          url: 'http://twitch.tv',
          image: 'barox',
          rating: 2
        },
        {
          name: 'LoL',
          description: 'Video sharing and streaming platform',
          url: 'http://youtube.com',
          image: 'barox',
          rating: 1
        },
        {
          name: 'Plepis.me :>',
          description: 'Video sharing and streaming platform',
          url: 'http://twitch.tv',
          image: 'barox',
          rating: 5
        }
      ]
    }
  },
  methods: {
    log() {
      console.log('hello?')
    },
    logTags(tags) {
      console.log(tags)
    }
  }
}
</script>

<style></style>
