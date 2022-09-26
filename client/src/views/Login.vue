<template>
  <div class="unauth-page">
    <template>
      <div class="img-container">
        <b-img src="images/login-image.jpg" fluid alt="Responsive image"> </b-img>
      </div>
      <div class="sign-in">
        <h1 class="sign-in-text"> Log in or sign up and <br> start reviewing today!</h1>
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="username"
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
        <b-row class="mb-2">
          <b-button v-on:click="registerUser()" type="submit" class="pink-btn mr-2 shadow" size="sm">Sign up</b-button>
          <b-button v-on:click="loginUser()" type="submit" variant="primary" class="shadow" size="sm">Log in</b-button>
        </b-row>
      </div>
      <div class="footer">
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    registerUser() {
      if (this.form.username.length > 0 && this.form.password.length > 0) {
        this.$router.push('/')
      }
    },
    loginUser() {
      if (this.form.username.length > 0 && this.form.password.length > 0) {
        console.log(this.form.username.length)
        this.$router.push('/')
      }
    }
  }
}
</script>
<style>

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img-container {
  width: 55%;
  position: absolute;
  height: 100%;
}
.sign-in {
  position: fixed;
  top: 20%;
  left: 50%;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
}
.sign-in-text{
  font-size: 2.2rem;
  margin: 1rem;
}
.pink-btn {
  background-color: #F06292 !important;
}

</style>
