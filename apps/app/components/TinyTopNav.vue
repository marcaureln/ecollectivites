<template>
  <div v-if="isAgent || !isLoggedIn" :class="{ 'tiny-top-nav': true, 'primary-bg': isAgent }">
    <nuxt-link v-if="isAgent" to="/dashboard">
      <span class="bold">Agent connecté |</span> Se rendre au tableau de bord
    </nuxt-link>
    <nuxt-link v-else to="/dashboard/connexion">
      <span class="bold">Agent de collectivités ?</span> S'indentifier
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    isAgent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.tiny-top-nav {
  width: 100vw;
  padding: 0.5rem 20vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1rem;
  color: white;
  background-color: black;
}

.primary-bg {
  background: $primary-variant;
}
</style>
