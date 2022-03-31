<template>
  <footer>
    <div class="wrapper">
      <div class="footer-logo">
        <nuxt-link to="/">
          <img
            src="@/assets/img/logo-large.png"
            alt="Logo eCollectivités"
            class="logo"
          />
        </nuxt-link>
      </div>
      <div class="footer-links">
        <nuxt-link to="" class="nav-link">Accueil</nuxt-link>
        <nuxt-link to="" class="nav-link">À propos</nuxt-link>
        <nuxt-link to="" class="nav-link">Nous contacter</nuxt-link>
      </div>
      <div class="footer-legal">
        <div>&#169; eCollectivités. 2022 Tous droits réservés.</div>
        <nuxt-link to="/privacy-policy" class="nav-link">
          Politique de confidentialité.
        </nuxt-link>
        <nuxt-link to="/terms-of-use" class="nav-link">
          Conditions d'utilisation.
        </nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  color: white;
  background-color: black;
  margin: 0;
  padding: 6rem 0;
}

.wrapper {
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.footer-logo {
  .logo {
    height: 128px;
    filter: invert(1);
  }
}

.footer-links {
  display: flex;
  flex-direction: column;

  a {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
}

.footer-legal {
  display: flex;
  flex-direction: column;
  text-align: right;

  div {
    margin-bottom: 1rem;
  }

  a {
    font-weight: bold;
    margin-bottom: 1rem;
  }
}
</style>
