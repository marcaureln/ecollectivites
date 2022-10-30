<template>
  <div>
    <div class="wrapper">
      <Nuxt class="main" />
      <div class="side-hero"></div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
}

.main {
  padding: 3rem;
  height: 100%;
}

.side-hero {
  width: 60%;
  height: 100vh;
  background-image: url("~/assets/img/dashboard-auth-bg.jpg");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
</style>
