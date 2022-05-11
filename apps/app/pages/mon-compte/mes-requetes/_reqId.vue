<template>
  <section>
    <div class="wrapper">
      <nuxt-link to="/mon-compte/mes-requetes">
        <ion-icon name="arrow-back"></ion-icon>
        <span> Retourner </span>
      </nuxt-link>
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
        <RequestResponse v-for="response in responses" :key="response.resId" :response="response" :userId="userId" />
      </div>
      <div v-else>
        <p>Aucune reponse pour l'instant, revenez régulièrement pour voir si vous avez de nouvelles réponses...</p>
      </div>

      <RequestResponseBox :reqId="request.reqId" :token="token" @responsesent="responsesent" />
    </div>
  </section>
</template>

<script>
export default {
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
        reqTypeLabel: requestTypes.find((type) => type.reqTypeId === request.reqTypeId).reqTypeLabel,
        reqStatusLabel: requestStatus.find((status) => status.reqStatusId === request.reqStatusId).reqStatusLabel,
      };
    } catch (e) {
      return error(e);
    }
  },
  head() {
    return {
      title: `Requête #${this.request.reqId} — eCollectivités`,
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
        this.responses = await this.$axios.$get(`/requests/${this.request.reqId}/responses`, { headers });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 6rem 0;
  width: 100%;
}

.wrapper {
  width: 600px;
  margin: auto;
}

h2 {
  font-family: "Barlow Condensed", sans-serif;
  font-weight: bold;
  font-size: 2rem;
  margin: 2rem 0 1rem 0;
}

table {
  border-spacing: 0;
  display: block;
  overflow-x: auto;
  text-align: left;
  width: 100%;
  margin: 1rem 0;
}

td {
  border-bottom: 0.1rem solid;
  padding: 1.2rem 1.5rem;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
}

tr td:first-child {
  font-weight: bold;
}

a {
  font-weight: bold;
}
</style>
