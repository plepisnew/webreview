<template>
  <div class="user-cards" v-if="users">
    <UserCard v-for="user in users" :key="user.username" :user="user" />
  </div>
</template>

<script>
import UserCard from './UserCard.vue'
export default {
  name: 'UserCards',
  components: { UserCard },
  props: {
    users: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.user-cards {
  display: flex;
  flex-direction: column;
}
</style>
