<template>
  <nav>
    <div class="nav-start">
      <nuxt-link to="/">
        <img
          src="@/assets/img/logo-large.png"
          alt="Logo eCollectivités"
          class="logo"
        />
      </nuxt-link>
    </div>

    <div class="nav-center">
      <nuxt-link to="" class="nav-link">Accueil</nuxt-link>
      <nuxt-link to="" class="nav-link">À propos</nuxt-link>
      <nuxt-link to="" class="nav-link">Nous contacter</nuxt-link>
    </div>

    <div class="nav-end">
      <nuxt-link to="" class="nav-link">Mon compte</nuxt-link>
      <button class="make-request-btn">Faire une requête</button>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  width: 100vw;
  padding: 1rem 20vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.1px;
}

.logo {
  height: 64px;
  margin: 0;
}

.nav-start,
.nav-center,
.nav-end {
  display: flex;
  align-items: center;
}

.nav-link {
  font-size: 1rem;
  font-weight: bold;
  margin-right: 1.5rem;
}

.make-request-btn {
  background: $primary;
  color: $on-primary;
  border-radius: 3px;
  transition: background ease 0.25s;
  border: none;
  margin: 0;
  padding: 0.75rem 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover,
  &:focus {
    background: $primary-variant;
  }
}
</style>
