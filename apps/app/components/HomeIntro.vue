<template>
  <section class="intro">
    <h1>Vous rapprochez de votre collectivité</h1>
    <h2 v-if="!isLoggedIn">Inscrivez-vous dès maintenant et effectuez votre première requête !</h2>
    <h2 v-else>Consulter pour voir l'avancement de vos requêtes</h2>
    <nuxt-link v-if="!isLoggedIn" to="/inscription" class="register">S'inscrire</nuxt-link>
    <nuxt-link v-else to="/mon-compte/mes-requetes" class="register">Consulter</nuxt-link>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<style lang="scss" scoped>
.intro {
  width: 40%;
  margin: auto;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-family: "Barlow Condensed", "Roboto", sans-serif;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  font-size: 6rem;
  line-height: 1;
  margin-bottom: 1rem;
}

h2 {
  text-align: center;
  font-size: 1.5rem;
  line-height: 1;
  font-weight: normal;
  margin-bottom: 2rem;
}

.register {
  @include button($secondary, $on-secondary, $secondary-variant);
  font-size: 1.2rem;
}
</style>
