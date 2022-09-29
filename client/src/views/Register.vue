<template>
  <div class="unauth-page">
    <div class="center">
    <b-card
    title="Create account"
    img-src="/images/webreview-1.png"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    bg-variant="dark" text-variant="white"
  >

    <b-card-text>
      <b-form inline>
        <label class="sr-only" for="inline-form-input-name">Username</label>
    <b-form-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-2"
      placeholder="Username"
    ></b-form-input>

    <label class="sr-only" for="inline-form-input-mail">Email</label>
    <b-form-input
      id="inline-form-input-mail"
      class="mb-2 mr-sm-2 mb-sm-2"
      placeholder="Email"
    ></b-form-input>
    <b-form  @submit.stop.prevent>
      <label for="user-password"></label>
      <b-form-input v-model="userPassword" :state="validation" id="user-password"></b-form-input>
      <b-form-invalid-feedback :state="validation">
        Your user Password must be 5-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Perfect.
      </b-form-valid-feedback>
     </b-form>
      </b-form>
    </b-card-text>

    <b-button href="home" variant="primary">create account</b-button>
    <b-card-body>
      <a href="login" class="card-link">already have an account?</a>
    </b-card-body>
    <template #footer>
        <em>All rights reserved 2022</em>
      </template>
  </b-card>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userPassword: ''
    }
  },
  computed: {
    validation() {
      return this.userPassword.length > 4 && this.userPassword.length < 13
    }
  }
}
</script>

<style >
.card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
}
  .content {
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 10px;
}

.unauth-page{
  background: rgb(33, 30, 30);
}
</style>
