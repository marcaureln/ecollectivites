<template>
  <div>
    <header>
      <nav>
        <nuxt-link to="/">
          <img src="@/assets/img/logo-large.png" alt="Logo eCollectivités" class="logo" />
        </nuxt-link>
      </nav>
    </header>
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  width: 100vw;
  padding: 1rem 20vw;
  display: flex;
  align-items: center;
}

.logo {
  height: 64px;
  margin: 0;
}
</style>
