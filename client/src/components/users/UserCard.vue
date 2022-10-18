<template>
  <div class="user-card mb-2" v-if="user">
    <router-link :to="`/profile/${user.username}`">
      <ProfilePicture :src="user.profilePictureSrc" />
    </router-link>
    <div class="text-container p-2">
      <p>
        <span class="font-weight-bold">{{ user.username }} </span>
        <span>({{ user.writtenReviews.length }} reviews)</span>
      </p>
      <p>Joined {{ getTimePassed(user.createdAt) }}</p>
      <p v-if="!user.isAdmin">
        Disabled for <input type="number" v-model="disable.days" /> days
        <input type="number" v-model="disable.hours" />
        hours
        <input type="number" v-model="disable.minutes" min="0" max="60" />
        minutes
      </p>
      <Button
        v-if="!user.isAdmin"
        class="disabler"
        :onClick="setDisabled"
        text="Save"
        :variant="dataChanged ? 'red' : 'green'"
      />
    </div>
  </div>
</template>

<script>
import { timePassed, timeUntil } from '@/utils/parseTime'
import ProfilePicture from '../ProfilePicture.vue'
import Button from '../Button.vue'
import { Api } from '@/Api'
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      disable: timeUntil(this.user.disabledUntil),
      dataChanged: false
    }
  },
  components: { ProfilePicture, Button },
  methods: {
    getTimePassed(createdAt) {
      return timePassed(createdAt)
    },
    getDisabled(disabledUntil) {
      return timePassed(disabledUntil, false)
    },
    async setDisabled() {
      this.dataChanged = false
      const currentTime = Date.now()
      const { minutes, hours, days } = this.disable
      const futureTime =
        currentTime + (minutes * 60 + hours * 3600 + days * 86400) * 1000
      const disabledUntil = new Date(futureTime).toISOString()
      await Api.patch(`/users/${this.user._id}`, { disabledUntil })
    }
  },
  watch: {
    disable: {
      handler(newDisable, oldDisable) {
        this.dataChanged = true
      },
      deep: true
    }
  }
}
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.profile-picture {
  height: 100px;
  width: 100px;
}
.user-card {
  position: relative;
  display: flex;
  height: 100px;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  background: rgb(40, 40, 40);
}

.text-container {
  display: flex;
  flex-direction: column;
}

.disabler {
  position: absolute;
  top: 0;
  right: 0;
  border-left: 4px solid rgb(30, 30, 30);
  border-bottom: 4px solid rgb(30, 30, 30);
  border-radius: 0;
  box-shadow: none;
}

input {
  border: none;
  background: none;
  border-bottom: 1px solid white;
  color: white;
  width: 3ch;
  text-align: center;
}

input:focus {
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

img {
  box-shadow: none;
  border-right: 4px solid rgb(30, 30, 30);
}
</style>
