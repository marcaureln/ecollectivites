<template>
  <section class="intro">
    <h1>Vous rapprochez de votre collectivité</h1>
    <h2>Inscrivez-vous dès maintenant et effectuez votre première requête !</h2>
    <nuxt-link to="/inscription" class="register-btn">S'inscrire</nuxt-link>
  </section>
</template>

<script>
export default {};
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

.register-btn {
  @include button($secondary, $on-secondary, $secondary-variant);
  width: fit-content;
  font-size: 1.25rem;
}
</style>
