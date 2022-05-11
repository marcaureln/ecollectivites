<template>
  <div class="request--wrapper">
    <h1>
      <nuxt-link to="/dashboard/inbox"><ion-icon name="arrow-back"></ion-icon></nuxt-link> Requête {{ request.reqId }}
    </h1>

    <div class="request--content">
      <h2>{{ request.title }}</h2>

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
            <a :href="cdnUrl + '/' + file">{{ extractFilename(file) }}</a>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun fichier</p>
      </div>

      <h2>Réponses</h2>
      <!-- TODO: Response component -->
      <div v-if="responses.length > 0">
        <div v-for="response in responses" :key="response.resId" class="response">
          <p>{{ response.resContent }}</p>
        </div>
      </div>
      <div v-else>
        <p>Aucune reponse pour l'instant, revenez régulièrement pour voir si vous avez de nouvelles réponses...</p>
      </div>

      <form @submit.prevent="sendResponse()">
        <input v-model="resContent" type="text" placeholder="Ecrire une message..." required />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
        request,
        responses,
        reqTypeLabel: requestTypes.find((type) => type.reqTypeId === request.reqTypeId).reqTypeLabel,
        reqStatusLabel: requestStatus.find((status) => status.reqStatusId === request.reqStatusId).reqStatusLabel,
      };
    } catch (e) {
      return error(e);
    }
  },
  data() {
    return {
      resContent: "",
      resAttachments: [],
      cdnUrl: this.$config.cdnUrl,
    };
  },
  head() {
    return {
      title: `Requête #${this.request.reqId} — Dashboard eCollectivités`,
    };
  },
  computed: {
    ...mapGetters(["token"]),
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
    handleFileUpload(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.resAttachments = files;
    },
    async sendResponse() {
      const formData = new FormData();
      const data = {
        reqId: this.request.reqId,
        resContent: this.resContent,
      };

      formData.append("data", JSON.stringify(data));

      for (const file of this.resAttachments) {
        formData.append("attachements", file);
      }

      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.token}`,
        };
        await this.$axios.$post("/responses", formData, { headers });
        this.$toast.success("Réponse envoyée avec succès!");
        window.location.reload();
      } catch (error) {
        this.$toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.request--wrapper {
  width: 100%;
  height: 100%;
  padding: 3rem;
  background: #f6f6f6;
}
</style>
