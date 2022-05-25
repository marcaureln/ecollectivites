<template>
  <div class="contacts--wrapper">
    <h1>Annuaire</h1>

    <table>
      <thead>
        <tr>
          <td>Nom</td>
          <td>Prénoms</td>
          <td>Adresse mail</td>
          <td>Téléphone</td>
          <td>Rôle</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.lastname }}</td>
          <td>{{ user.firstname }}</td>
          <td>
            <a :href="'mailto:' + user.email">{{ user.email }}</a>
          </td>
          <td>
            <a :href="'tel:' + user.phone">{{ user.phone }}</a>
          </td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  async asyncData({ $axios, store, error }) {
    try {
      const headers = { Authorization: `Bearer ${store.getters.token}` };
      const users = await $axios.$get(`/collectivites/${store.state.user.collectId}/users`, { headers });

      return {
        users,
      };
    } catch (e) {
      error(e);
    }
  },
  head() {
    return {
      title: "Annuaire — Dashboard eCollectivités",
    };
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border: 1px solid #999;
  border-collapse: collapse;
}

thead {
  font-weight: bold;
}

td {
  border: 1px solid #999;
  padding: 1rem;
}
</style>
