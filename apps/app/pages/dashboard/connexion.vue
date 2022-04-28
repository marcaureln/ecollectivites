<template>
  <section class="wrapper">
    <nuxt-link to="/">
      <img src="@/assets/img/logo-large.png" alt="Logo eCollectivités" class="logo" />
    </nuxt-link>

    <h1>Se connecter</h1>
    <form class="email-login-form" @submit.prevent="loginWithEmail()">
      <div>
        <label for="email">Email :</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit" class="login-btn">Se connecter</button>
    </form>
    <nuxt-link to="/connexion" class="redirect">
      Vous n'êtes pas un agent de collectivités ? Connectez-vous ici
    </nuxt-link>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: "dashboard-auth",
  middleware({ store, redirect, error }) {
    if (store.getters.isLoggedIn) {
      if (store.user.isAgent) {
        redirect("/dashboard");
      } else {
        error({ statusCode: 403, message: "Vous n'avez pas les droits pour accéder à cette page" });
      }
    }
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  head() {
    return {
      title: "Se connecter — eCollectivités",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async loginWithEmail() {
      const response = await this.login({
        method: "email",
        email: this.email,
        password: this.password,
      });

      if (response === true) {
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 400px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 64px;
  margin: 0;
  margin-bottom: 3rem;
}

h1 {
  margin: 1rem 0;
}

label {
  font-size: 1rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0 1rem 0;
  font-size: 1rem;
}

a {
  font-weight: bold;
}

p {
  margin: 0;
  font-size: 1rem;
}

.login-btn {
  @include button;
  width: 100%;
  margin-top: 1rem;
}

.redirect {
  margin-top: 2rem;
  font-size: 1rem;
  text-align: center;
}
</style>
