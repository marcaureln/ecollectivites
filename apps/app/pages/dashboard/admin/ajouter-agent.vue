<template>
  <div class="add-agent--wrapper">
    <h1>Ajouter un agent</h1>
    <form @submit.prevent="addAgent()">
      <div class="form-group">
        <label for="lastname">Nom :</label>
        <input id="lastname" v-model="lastname" type="text" required />
      </div>
      <div class="form-group">
        <label for="firstname">Prénoms :</label>
        <input id="firstname" v-model="firstname" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">Email :</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="role">Rôle :</label>
        <select id="role" v-model="role" required>
          <option v-for="(value, index) in roles" :key="index" :value="value">{{ value }}</option>
        </select>
      </div>
      <div class="form-group">
        <p>
          Le mot de passe par défaut du compte est : {{ password }} <br />
          Il sera réinitialisé par l'utilisateur à la première connexion.
        </p>
      </div>
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  async asyncData({ $axios, store }) {
    const roles = await $axios.$get("/users/roles");
    const collectId = store.state.user.collectId;
    const token = store.getters.token;

    return {
      token,
      roles,
      collectId,
    };
  },
  data() {
    return {
      lastname: "",
      firstname: "",
      email: "",
      role: "",
      password: "123456789",
    };
  },
  head() {
    return {
      title: "Ajouter un agent — Dashboard eCollectivités",
    };
  },
  methods: {
    async addAgent() {
      try {
        const headers = { Authorization: `Bearer ${this.token}` };
        const response = await this.$axios.$post(
          "/users",
          {
            firstname: this.firstname,
            lastname: this.lastname,
            collectId: this.collectId,
            role: this.role,
            email: this.email,
            password: this.password,
          },
          { headers }
        );

        if (response) {
          this.$toast.success("Utilisateur créé avec succès!");
          this.firstname = "";
          this.lastname = "";
          this.email = "";
        }
      } catch (error) {
        this.$toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
