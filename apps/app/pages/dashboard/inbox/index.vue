<template>
  <div class="inbox--wrapper">
    <h1>Inbox</h1>

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
            <nuxt-link :to="'/dashboard/inbox/' + request.reqId">Voir</nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  async asyncData({ $axios, store, error }) {
    try {
      const headers = {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${store.getters.token}`,
      };
      const requests = await $axios.$get(`/collectivites/${store.state.user.collectId}/requests`, { headers });
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
  head() {
    return {
      title: "Boite de réception — Dashboard eCollectivités",
    };
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
.inbox--wrapper {
  width: 100%;
  height: 100%;
  padding: 3rem;
}

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
