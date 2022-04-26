<template>
  <header>
    <TinyTopNav :isLoggedIn="isLoggedIn" :isAgent="user != null && user.isAgent" />
    <nav>
      <div class="nav-start">
        <nuxt-link to="/">
          <img src="@/assets/img/logo-large.png" alt="Logo eCollectivités" class="logo" />
        </nuxt-link>
      </div>

      <div class="nav-center">
        <nuxt-link to="/" class="nav-link">Accueil</nuxt-link>
        <nuxt-link to="/a-propos" class="nav-link">À propos</nuxt-link>
        <nuxt-link to="/nous-contacter" class="nav-link">Nous contacter</nuxt-link>
      </div>

      <div class="nav-end">
        <nuxt-link v-if="!isLoggedIn" class="login-btn" to="/connexion">Se connecter</nuxt-link>
        <MyAccountButton v-else />
        <nuxt-link to="/mon-compte/nouvelle-requete" class="make-request-btn">Faire une requête</nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  mounted() {
    this.$forceUpdate();
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
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

.login-btn {
  @include button;
  @include button-inverted;
}

.make-request-btn {
  @include button;
  margin-left: 1rem;
}
</style>
