<template>
  <div class="login-container">
    <div class="img-container">
      <span class="webreview-title">WebReview</span>
      <b-img src="images/login-image.jpg" fluid alt="Responsive image"> </b-img>
    </div>
    <div class="sign-in">
      <h1 class="sign-in-text my-5">
        Log in or sign up and <br />
        start reviewing today!
      </h1>
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          placeholder="Username"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <div class="button-container">
        <Button text="Sign Up" variant="red" :onClick="registerUser" />
        <Button text="Log in" variant="blue" :onClick="loginUser" />
      </div>
      <p class="error-message mt-3">{{ error }}</p>
      <div class="footer">
        <p>Random corporate bullcrap inc. trademark</p>
        <p>Sponsored by canvas</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Button from '@/components/Button.vue'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  components: {
    Button
  },
  methods: {
    registerUser() {
      this.$router.push('/register')
    },
    async loginUser() {
      const { username, password } = this.form
      try {
        const res = await Api.post('/login', {
          username,
          password
        })
        const { accessToken, user } = res.data
        const dt = new Date(user.disabledUntil) - new Date()
        const isDisabled = dt > 0
        if (isDisabled) {
          this.error = `Your account is disabled for another ${Math.floor(
            dt / 1000
          )} seconds`
        } else {
          localStorage.token = accessToken
          this.$router.push('/')
        }
      } catch (err) {
        this.error = 'Invalid credentials!'
        console.log(err)
      }
    }
  }
}
</script>
<style scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100%;
}

#input-group-1,
#input-group-2 {
  width: 70%;
}

button {
  flex: 1;
}

p {
  line-height: normal;
  margin: 0;
}

.footer {
  margin-top: auto;
  color: white;
}

.button-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 70%;
}

.webreview-title {
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px 40px;
  bottom: 5%;
  left: 5%;
  font-size: 60px;
  font-weight: 700;
  line-height: normal;
  border-radius: 40px;
}

.img-container {
  position: relative;
  width: 70%;
  height: 100%;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.sign-in {
  padding: 20px;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sign-in-text {
  width: 70%;
  color: white;
  font-size: 2.2rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  color: rgb(183, 28, 28);
  text-align: right;
}
</style>
