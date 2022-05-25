<template>
  <div class="manage-collectivite--wrapper">
    <h1>Gérer les informations de la collectivité</h1>

    <form @submit.prevent="updateInfo()">
      <div class="form-group">
        <label for="collect-id">Id :</label>
        <input id="collect-id" v-model="collectId" type="text" disabled />
      </div>

      <div class="form-group">
        <label for="collect-name">Nom :</label>
        <input id="collect-name" v-model="collectName" type="text" required />
      </div>

      <div class="form-group">
        <label for="collect-type">Type de collectivité</label>
        <select id="collect-type" v-model="collectTypeId" class="form-control" required>
          <option v-for="type in collectTypes" :key="type.collectTypeId" :value="type.collectTypeId">
            {{ type.collectTypeLabel }}
          </option>
        </select>
      </div>

      <button type="submit">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  async asyncData({ $axios, store }) {
    const token = store.getters.token;
    const collectId = store.state.user.collectId;
    const collectTypes = await $axios.$get("/collectivites/types");
    const collect = await $axios.$get(`/collectivites/${collectId}`);

    return {
      collectId,
      collectName: collect.collectName,
      collectTypeId: collect.collectTypeId,
      collectTypes,
      token,
    };
  },
  head() {
    return {
      title: "Gérer collectivité — Dashboard eCollectivités",
    };
  },
  methods: {
    async updateInfo() {
      try {
        const headers = {
          Authorization: `Bearer ${this.token}`,
        };
        const data = {
          collectName: this.collectName,
          collectTypeId: this.collectTypeId,
        };
        await this.$axios.$post(`/collectivites/${this.collectId}/update`, data, { headers });
        this.$toast.success("Les informations ont été mises à jour avec succès !");
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
