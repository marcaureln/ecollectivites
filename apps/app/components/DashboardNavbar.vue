<template>
  <nav class="navbar--wrapper">
    <nuxt-link to="/mon-compte" target="_blank" class="my-account">
      Mon compte <ion-icon name="open"></ion-icon>
    </nuxt-link>
    <button class="logout-btn" @click="logout()">Se déconnecter</button>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style lang="scss" scoped>
.navbar--wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.my-account {
  display: inline-block;
  margin-right: 1rem;
  font-weight: bold;
}

.logout-btn {
  @include button($error);
  text-align: center;
}
</style>
