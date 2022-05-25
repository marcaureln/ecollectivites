<template>
  <div class="request--wrapper">
    <h1>
      <nuxt-link to="/dashboard/inbox"><ion-icon name="arrow-back"></ion-icon></nuxt-link> Requête {{ request.reqId }}
    </h1>

    <div class="request--content">
      <h1>{{ request.title }}</h1>
      <table>
        <tr>
          <td>ID</td>
          <td>{{ request.reqId }}</td>
        </tr>
        <tr>
          <td>Statut</td>
          <td>{{ reqStatusLabel }}</td>
        </tr>
        <tr>
          <td>Type de requête</td>
          <td>{{ reqTypeLabel }}</td>
        </tr>
        <tr>
          <td>Date de soumission</td>
          <td>{{ new Date(request.reqCreatedAt).toLocaleDateString() }}</td>
        </tr>
        <tr v-if="request.reqClosedAt != null">
          <td>Date de clôture</td>
          <td>{{ new Date(request.reqClosedAt).toLocaleDateString() }}</td>
        </tr>
      </table>

      <h2>Détails</h2>
      <p>{{ request.reqContent }}</p>

      <h2>Fichiers</h2>
      <div v-if="reqAttachments.length > 0">
        <ul>
          <li v-for="(file, index) in reqAttachments" :key="index">
            <a :href="file">{{ extractFilename(file) }}</a>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun fichier</p>
      </div>

      <h2>Réponses</h2>
      <div v-if="responses.length > 0">
        <RequestResponse
          v-for="response in responses"
          :key="response.resId"
          :response="response"
          :userId="userId"
          :isAgent="true"
        />
      </div>
      <div v-else>
        <p>Aucune reponse pour l'instant, revenez régulièrement pour voir si vous avez de nouvelles réponses...</p>
      </div>

      <RequestResponseBox
        :reqId="request.reqId"
        :reqStatusId="request.reqStatusId"
        :token="token"
        :isAgent="true"
        @responsesent="responsesent"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  async asyncData({ params, $axios, store, error }) {
    const reqId = params.reqId;

    try {
      const headers = {
        Authorization: `Bearer ${store.getters.token}`,
      };
      const request = await $axios.$get(`/requests/${reqId}`, { headers });
      const responses = await $axios.$get(`/requests/${reqId}/responses`, { headers });
      const requestTypes = await $axios.$get("/requests/types");
      const requestStatus = await $axios.$get("/requests/status");

      return {
        userId: store.state.user.id,
        token: store.getters.token,
        request,
        responses,
        requestStatus,
        reqTypeLabel: requestTypes.find((type) => type.reqTypeId === request.reqTypeId).reqTypeLabel,
        reqStatusLabel: requestStatus.find((status) => status.reqStatusId === request.reqStatusId).reqStatusLabel,
      };
    } catch (e) {
      return error(e);
    }
  },
  head() {
    return {
      title: `Requête #${this.request.reqId} — Dashboard eCollectivités`,
    };
  },
  computed: {
    reqAttachments() {
      const attachments = this.request.reqAttachments.split(";");
      attachments.pop(); // Pop because the separator at the end of the string append an empty string to the array.
      return attachments;
    },
  },
  methods: {
    extractFilename(file) {
      return file.split("/").pop();
    },
    async responsesent(error) {
      if (error) {
        this.$toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
      } else {
        this.$toast.success("Réponse envoyée avec succès!");
        const headers = { Authorization: `Bearer ${this.token}` };
        this.request = await this.$axios.$get(`/requests/${this.request.reqId}`, { headers });
        this.responses = await this.$axios.$get(`/requests/${this.request.reqId}/responses`, { headers });
        this.reqStatusLabel = this.requestStatus.find(
          (status) => status.reqStatusId === this.request.reqStatusId
        ).reqStatusLabel;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.request--content {
  width: 80%;
  margin: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  border: 1px solid #ccc;
  padding: 1rem;
}

tr td:first-child {
  font-weight: bold;
}
</style>
