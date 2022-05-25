<template>
  <div class="manage-agent--wrapper">
    <h1>
      <nuxt-link to="/dashboard/admin/gerer-agent"><ion-icon name="arrow-back"></ion-icon></nuxt-link>
      {{ firstname + " " + lastname }}
    </h1>

    <form @submit.prevent="updateInfo()">
      <div class="form-group">
        <label for="agent-id">ID :</label>
        <input id="agent-id" v-model="agentId" type="text" disabled />
      </div>
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
        <label for="phone">Téléphone :</label>
        <input id="phone" v-model="phone" type="tel" />
      </div>
      <!-- TODO: Update API -->
      <!-- <div class="form-group">
        <label for="role">Rôle :</label>
        <select id="role" v-model="role" required>
          <option v-for="(value, index) in roles" :key="index" :value="value">{{ value }}</option>
        </select>
      </div> -->
      <button type="submit">Modifier</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  async asyncData({ params, $axios, store, error }) {
    const agentId = params.userId;

    try {
      const headers = { Authorization: `Bearer ${store.getters.token}` };
      const agent = await $axios.$get(`/users/${agentId}`, { headers });
      const roles = await $axios.$get("/users/roles");

      return {
        userId: store.state.user.id,
        token: store.getters.token,
        agent,
        agentId,
        firstname: agent.firstname,
        lastname: agent.lastname,
        phone: agent.phone,
        email: agent.email,
        role: agent.role,
        roles,
      };
    } catch (e) {
      return error(e);
    }
  },
  head() {
    return {
      title: `Agent ${this.agent.userId} — Dashboard eCollectivités`,
    };
  },
  methods: {
    async updateInfo() {
      try {
        const headers = { Authorization: `Bearer ${this.token}` };
        const response = await this.$axios.$post(
          `/users/${this.agent.userId}/update`,
          { firstname: this.firstname, lastname: this.lastname, email: this.email, phone: this.phone },
          { headers }
        );

        if (response) {
          this.$toast.success("Utilisateur modifié avec succès!");
        }
      } catch (error) {
        this.$toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 400px;
  margin: auto;
  margin-top: 3rem;
}

button {
  width: 100%;
}
</style>
