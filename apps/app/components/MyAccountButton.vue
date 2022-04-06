<template>
  <BaseDropdown :label="'Mon Compte'" :classList="['my-account-btn']" id="my-account-dropdown">
    <nuxt-link to="">Mes requêtes</nuxt-link>
    <nuxt-link to="/mon-compte/nouvelle-requete">Faire une requête</nuxt-link>
    <nuxt-link to="">Modifier mes informations</nuxt-link>
    <button class="logout-btn" @click="logout()">Se déconnecter</button>
  </BaseDropdown>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style lang="scss">
#my-account-dropdown {
  a {
    display: block;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 3px;
    font-size: 1rem;
    transition: background ease 0.25s;

    &:hover {
      background: darken($color: $background, $amount: 10);
    }
  }

  .my-account-btn {
    @include button($secondary, $on-secondary, $secondary-variant);
  }

  .logout-btn {
    @include button($error);
    text-align: center;
    width: 100%;
  }
}
</style>
