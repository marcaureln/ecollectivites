<template>
  <nav>
    <div class="nav-start">
      <nuxt-link to="/">
        <img
          src="@/assets/img/logo-large.png"
          alt="Logo eCollectivités"
          class="logo"
        />
      </nuxt-link>
    </div>

    <div class="nav-center">
      <nuxt-link to="" class="nav-link">Accueil</nuxt-link>
      <nuxt-link to="" class="nav-link">À propos</nuxt-link>
      <nuxt-link to="" class="nav-link">Nous contacter</nuxt-link>
    </div>

    <div class="nav-end">
      <button v-if="!isLoggedIn" class="nav-link" @click="openLoginModal()">
        Se connecter
      </button>
      <button v-else class="nav-link">Mon compte</button>
      <LoginModal
        :isActive="isLoginModalActive"
        @close="closeLoginModal()"
      ></LoginModal>
      <button class="make-request-btn">Faire une requête</button>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isLoginModalActive: false,
    };
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    openLoginModal() {
      this.isLoginModalActive = true;
    },
    closeLoginModal() {
      this.isLoginModalActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  width: 100vw;
  padding: 1rem 20vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.1px;
}

.logo {
  height: 64px;
  margin: 0;
}

.nav-start,
.nav-center,
.nav-end {
  display: flex;
  align-items: center;
}

.nav-link {
  font-size: 1rem;
  font-weight: bold;
  margin-right: 1.5rem;
}

.make-request-btn {
  @include button;
}
</style>
