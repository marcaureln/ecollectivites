<template>
  <section class="wrapper">
    <div class="content">
      <h1>Comment ça marche ?</h1>
      <div class="steps">
        <div class="step">
          <h2>Créer un compte</h2>
          <p>
            Vous devez créer un compte avec votre adresse mail ou votre numéro de téléphone pour avoir accès à certaines
            fonctionnalités comme la création d'une requête.
          </p>
        </div>
        <div class="step">
          <h2>Faire sa requête</h2>
          <p>
            Dans l'onglet <strong>Mon Compte</strong>, cliquez sur <strong>Faire une requête</strong> et remplissez le
            formulaire, puis cliquez sur <strong>Envoyer</strong>.
          </p>
        </div>
        <div class="step">
          <h2>Consulter</h2>
          <p>Revenez régulièrement pour voir l'avancement de vos requêtes.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  background: $primary-variant;
  color: $on-primary;
  margin: 0;
  padding: 4rem 0 6rem 0;
}

.content {
  width: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.steps {
  display: flex;
  justify-content: space-between;
}

.step {
  width: 30%;
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

h2 {
  text-align: center;
  font-size: 1.5rem;
}

p {
  text-align: center;
}
</style>
