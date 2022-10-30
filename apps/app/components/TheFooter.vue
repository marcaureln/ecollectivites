<template>
  <footer>
    <div class="footer--wrapper">
      <div class="footer-logo">
        <nuxt-link to="/">
          <img src="@/assets/img/logo-large.png" alt="Logo eCollectivités" class="logo" />
        </nuxt-link>
      </div>
      <div class="footer-links">
        <nuxt-link to="/" class="nav-link">Accueil</nuxt-link>
        <nuxt-link to="/a-propos" class="nav-link">À propos</nuxt-link>
        <nuxt-link to="/nous-contacter" class="nav-link">Nous contacter</nuxt-link>
      </div>
    </div>

    <div class="footer-legal">
      <p>&#169; 2022 eCollectivités. Tous droits réservés.</p>
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
  padding: 6rem 20% 2rem;
}

.footer--wrapper {
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.footer-logo {
  .logo {
    height: 92px;
    filter: invert(1);
  }
}

.footer-links {
  display: flex;
  flex-direction: column;
  text-align: right;

  a {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
}

.footer-legal {
  margin-top: 4rem;
  text-align: center;
}
</style>
