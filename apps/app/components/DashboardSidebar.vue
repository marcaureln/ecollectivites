<template>
  <div class="wrapper">
    <nuxt-link to="/dashboard" class="sidebar-logo">
      <img src="@/assets/img/logo.png" alt="Logo eCollectivités" class="logo" />
      <h1>Dashboard</h1>
    </nuxt-link>

    <h3>Général</h3>
    <ul>
      <li>
        <nuxt-link to="/dashboard"><ion-icon name="analytics"></ion-icon>Vue d'ensemble</nuxt-link>
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

    <h3>Requêtes</h3>
    <ul>
      <li>
        <nuxt-link to="/dashboard/inbox"><ion-icon name="mail-unread"></ion-icon>Boite de réception</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/dashboard/nouvelle-requete"><ion-icon name="create"></ion-icon>Faire une requête</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/dashboard/mes-requetes"><ion-icon name="send"></ion-icon>Mes requêtes</nuxt-link>
      </li>
    </ul>

    <h3>Mon compte</h3>
    <ul>
      <li>
        <nuxt-link to="/dashboard/mon-compte"><ion-icon name="contact"></ion-icon>Mes informations</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
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
  font-weight: normal;
  margin-left: 1rem;
  font-size: 1rem;
  letter-spacing: 0.1rem;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style-type: none;
}

a {
  display: inline-block;
  padding: 1rem 1.5rem;
  width: 100%;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: lighten($color: $secondary, $amount: 10);
  }

  &.nuxt-link-exact-active {
    background: $secondary;
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.5);
  }
}

ion-icon {
  margin-right: 9px;
  font-size: 24px;
  vertical-align: middle;
}

.sidebar-logo {
  display: flex;
  align-items: center;

  &.nuxt-link-exact-active {
    background: unset;
    box-shadow: unset;
  }

  h1 {
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .logo {
    height: 48px;
    margin: 0;
  }
}
</style>
