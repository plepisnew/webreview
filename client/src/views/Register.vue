<template>
  <div class="register-container">
    <b-card
      title="Create account"
      img-src="/images/webreview-1.png"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 25rem;"
      bg-variant="dark"
      text-variant="white"
    >
      <b-card-text>
        <b-form-group
          :state="formValidation"
          :valid-feedback="`Looks good to me, ${username}!`"
          :invalid-feedback="invalidFeedback"
        >
          <b-form valid-feedback="Kek">
            <label class="sr-only" for="input-username">Username</label>
            <b-form-input
              id="input-username"
              class="mr-sm-2 mb-sm-2"
              placeholder="Username"
              v-model="username"
              required
            />
            <label class="sr-only" for="input-input-descripton"
              >Description</label
            >
            <b-form-textarea
              rows="3"
              id="input-description"
              class="mr-sm-2 mb-sm-2"
              v-model="description"
              placeholder="Tell us something about yourself (Optional)"
            />
            <label class="sr-only" for="input-password">Password</label>
            <b-form-input
              type="password"
              id="input-password"
              class="mr-sm-2 mb-sm-2"
              v-model="password"
              placeholder="Password"
              required
            />
          </b-form>
        </b-form-group>
      </b-card-text>
      <b-card-body class="card-buttons">
        <Button class="m-1" text="Create Account" :onClick="registerUser" />
        <router-link class="card-link m-1" to="/login">
          Already have an account?
        </router-link>
      </b-card-body>
      <template #footer>
        <em>All rights reserved 2022</em>
      </template>
    </b-card>
  </div>
</template>

<script>
import Button from '@/components/Button'
import { Api } from '@/Api'
import 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      description: '',
      error: ''
    }
  },
  computed: {
    formValidation() {
      return (
        this.password.length > 4 && this.password.length < 13 && !!this.username
      )
    },
    invalidFeedback() {
      if (this.error) return this.error
      if (this.password.length <= 4 || this.password.length >= 13) {
        return 'Password must be 5-13 characters long'
      }
      return 'Please specify a username'
    }
  },
  methods: {
    async registerUser() {
      this.error = ''
      try {
        await Api.post('/register', {
          username: this.username,
          password: this.password,
          description: this.description
        })
        this.$router.push('/login')
      } catch (err) {
        if (err.response.data.message.includes('duplicate key')) {
          this.error = `Username ${this.username} is already taken`
          this.username = ''
        }
      }
    }
  },
  components: {
    Button
  }
}
</script>

<style>
.register-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 !important;
}

.error {
  color: red;
}

.card {
  float: none; /* Added */
  margin: auto;
}
.content {
  max-width: 700px;
}

.unauth-page {
  background: rgb(33, 30, 30);
}
</style>
