<template>
  <section>
    <h1>Mes Requêtes</h1>

    <div class="wrapper">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Type Requête</td>
            <td>Date de soumission</td>
            <td>Statut</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests" :key="request.reqId">
            <td>{{ request.reqId.split("-").join("") }}</td>
            <td>{{ requestTypeLabel(request.reqTypeId) }}</td>
            <td>{{ new Date(request.reqCreatedAt).toLocaleDateString() }}</td>
            <td class="status">{{ requestStatusLabel(request.reqStatusId) }}</td>
            <td>
              <nuxt-link :to="'/mon-compte/mes-requetes/' + request.reqId">Voir</nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  head() {
    return {
      title: "Mes Requêtes — eCollectivités",
    };
  },
  async asyncData({ $axios, store, error }) {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${store.getters.token}`,
      };
      const requests = await $axios.$get("/me/requests", { headers });
      const requestTypes = await $axios.$get("/requests/types");
      const requestStatus = await $axios.$get("/requests/status");

      return {
        requests,
        requestTypes,
        requestStatus,
      };
    } catch (e) {
      error(e);
    }
  },
  computed: {
    ...mapState({ userCollectId: "collectId", userId: "userId" }),
    ...mapGetters(["token"]),
  },
  methods: {
    requestStatusLabel(reqStatusId) {
      return this.requestStatus.find((status) => status.reqStatusId === reqStatusId).reqStatusLabel;
    },
    requestTypeLabel(reqTypeId) {
      return this.requestTypes.find((type) => type.reqTypeId === reqTypeId).reqTypeLabel;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  padding: 6rem 0;
}

h1 {
  font-family: "Barlow Condensed", "Roboto", sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: 4rem;
  line-height: 1;
  margin: 0 0 2rem 0;
}

.wrapper {
  width: 800px;
  margin: auto;
}

table {
  border-spacing: 0;
  display: block;
  overflow-x: auto;
  text-align: left;
  width: 100%;
}

thead {
  font-weight: bold;
  font-style: italic;
}

td,
th {
  border-bottom: 0.1rem solid;
  padding: 1.2rem 1.5rem;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
}

.status,
a {
  font-weight: bold;
}
</style>
