<template>
  <section>
    <h1>Qui sommes-nous ?</h1>
    <p>
      eCollectivités permet de réduire les inégalités concernant la présence en ligne des collectivités, car elles n’ont
      pas toutes les ressources financières et humaines pour disposer d'un site internet. De plus, cette plateforme
      facilite la collaboration entre les collectivités et aussi permet de délivrer numériquement vos documents
      administratifs.
    </p>
    <nuxt-link to="/a-propos" class="button">En savoir plus</nuxt-link>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  padding: 4rem 0 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  font-family: "Barlow Condensed", "Roboto", sans-serif;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  font-size: 4rem;
  margin: 0;
  margin-bottom: 1rem;
}

p {
  width: 40%;
  line-height: 1.5rem;
  margin-bottom: 2rem;
}

.button {
  @include button($secondary, $on-secondary, $secondary-variant);
  font-size: 1.2rem;
}
</style>
