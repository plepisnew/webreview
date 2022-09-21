<template>
  <b-navbar type="dark" fixed="top" variant="dark">
    <b-navbar-brand to="/">
      <img class="website-icon" src="/images/webreview.png" />
      <b-nav-text class="mx-3 font-weight-bold">WebReview</b-nav-text>
    </b-navbar-brand>
    <b-nav-text class="m-auto h3">For all your reviewing needs</b-nav-text>
    <b-navbar-nav>
      <b-nav-item class="my-auto" to="/websites">Websites</b-nav-item>
      <b-nav-item class="my-auto" to="/reviews">Reviews</b-nav-item>
      <b-nav-item class="my-auto" to="/profile/me">
        <img class="user-icon" src="/images/user_icon.png" />
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style>
.website-icon {
  width: 50px;
  border-radius: 10%;
}
.user-icon {
  width: 50px;
  border-radius: 50%;
}
.router-link-exact-active {
  color: white;
}
.navbar-light .navbar-nav .nav-link {
  color: black;
}
</style>
