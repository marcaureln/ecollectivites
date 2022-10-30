<template>
  <section>
    <h1>Réinitialiser votre mot de passe</h1>
    <form @submit.prevent="changePassword()">
      <div class="form-group">
        <label for="email">Email :</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="current-password">Ancien mot de passe :</label>
        <input id="current-password" v-model="currentPassword" type="password" required />
      </div>
      <div class="form-group">
        <label for="new-password">Nouveau mot de passe :</label>
        <input id="new-password" v-model="newPassword" type="password" required />
      </div>
      <button type="submit">Modifier</button>
    </form>
  </section>
</template>

<script>
export default {
  layout: "default-auth",
  asyncData({ query }) {
    const email = query.email ?? "";
    const redirect = query.redirect;

    return { email, redirect };
  },
  data() {
    return {
      currentPassword: "",
      newPassword: "",
    };
  },
  head() {
    return {
      title: "Réinitialiser son mot de passe — eCollectivités",
    };
  },
  methods: {
    async changePassword() {
      try {
        const response = await this.$axios.$post("/me/change-password", {
          email: this.email,
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        });

        if (response) {
          this.$toast.success("Mot de passe mis à jour avec success.");
          this.$router.push(this.redirect ?? "/connexion");
        }
      } catch (error) {
        this.$toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 400px;
  margin: 3rem auto;
}

.form-group {
  margin: 1rem 0;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0 1rem 0;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
}

button,
input[type="submit"] {
  @include button;
  margin-bottom: 1rem;
  display: block;
  width: 100%;
}
</style>
