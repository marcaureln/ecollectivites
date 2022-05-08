<template>
  <div class="sidebar--wrapper">
    <nuxt-link to="/dashboard" class="sidebar--header">
      <img src="@/assets/img/logo.png" alt="Logo eCollectivités" class="sidebar--logo" />
      <h1>Tableau de bord</h1>
    </nuxt-link>

    <h3>Général</h3>
    <ul>
      <li>
        <nuxt-link to="/dashboard"><ion-icon name="analytics"></ion-icon>Vue d'ensemble</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/dashboard/inbox"><ion-icon name="mail-unread"></ion-icon>Boite de réception</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/dashboard/annuaire"><ion-icon name="contacts"></ion-icon>Annuaire</nuxt-link>
      </li>
    </ul>

    <h3>Administration</h3>
    <ul>
      <li>
        <nuxt-link to="/dashboard/admin/ajouter-agent">
          <ion-icon name="person-add"></ion-icon>Ajouter agent
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/dashboard/admin/gerer-agent"><ion-icon name="people"></ion-icon>Gérer agents</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/dashboard/admin/gerer-collectivite">
          <ion-icon name="business"></ion-icon>Gérer collectivité
        </nuxt-link>
      </li>
    </ul>

    <h3>Mon compte <ion-icon name="open"></ion-icon></h3>
    <ul>
      <li>
        <nuxt-link to="/mon-compte/mes-requetes" target="_blank">
          <ion-icon name="mail"></ion-icon>Mes requêtes
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/mon-compte/nouvelle-requete" target="_blank">
          <ion-icon name="send"></ion-icon>Faire une requête
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/mon-compte" target="_blank">
          <ion-icon name="contact"></ion-icon>Modifier mes informations
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sidebar--wrapper {
  display: flex;
  flex-direction: column;
  width: 15vw;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  color: white;
  background: $secondary-variant;
  background: linear-gradient(300deg, $secondary-variant 0%, lighten($color: $secondary-variant, $amount: 15) 100%);
}

h3 {
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.05rem;
  margin-left: 1rem;
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

a {
  display: inline-block;
  padding: 1rem 1.5rem;
  width: 100%;
  transition: background 0.3s ease;

  &:hover,
  &.nuxt-link-exact-active {
    background: $secondary;
  }
}

ion-icon {
  margin-right: 1rem;
  font-size: 18px;
  vertical-align: middle;
}

.sidebar--header {
  display: flex;
  align-items: center;

  &.nuxt-link-exact-active {
    background: unset;
    box-shadow: unset;
  }

  h1 {
    font-size: 2rem;
    font-family: "Barlow Condensed", sans-serif;
    margin: 1rem 0;
  }
}

.sidebar--logo {
  height: 40px;
  margin: 0;
  margin-right: 0.5rem;
}
</style>
