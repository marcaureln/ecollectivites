<template>
  <div class="about--wrapper">
    <h1>Pourquoi eCollectivités ?</h1>
    <p>
      Les collectivités territoriales sont des personnes morales de droit public dotées d’autonomie financière. Elles
      sont constituées des régions et communes. Les collectivités font face actuellement à des défis de plus en plus
      grands vu leurs nombres (31 régions et 201 communes) et du nombre sans cesse croissant de personnes à administrer.
      Il y a donc une obligation pour l'État Ivoirien d’instaurer de nouvelles pratiques afin de réduire d’énormes
      désagréments (pertes de temps, pertes de documents par correspondance, dépenses, etc.). Ainsi, il est pertinent de
      se poser la question suivante : Comment rapprocher les citoyens de leurs collectivités grâce à Internet ?
      Heureusement, les TIC nous offrent l’opportunité de faire face à ce problème.
    </p>

    <h1>Objectif du projet</h1>
    <p>
      L’objectif principal de notre plateforme est de mettre en place un portail web unique à la disposition de toutes
      les collectivités. Cette plateforme permettra de réduire les inégalités concernant la présence en ligne des
      collectivités, car elles n’ont pas toutes les ressources financières et humaines pour concevoir, déployer et
      maintenir une application web. De plus, cette plateforme facilitera la collaboration entre les collectivités. Ces
      dernières pourront effectuer des requêtes en interne soit pour mieux traiter la requête d’un citadin, soit pour un
      simple échange d'informations entre elles.
    </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "À Propos — eCollectivités",
    };
  },
};
</script>

<style lang="scss" scoped>
.about--wrapper {
  width: 100%;
  padding: 0 30% 6rem;
  text-align: center;
}

h1 {
  margin-top: 4rem;
}
</style>
