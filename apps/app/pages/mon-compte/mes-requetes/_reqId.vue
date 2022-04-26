<template>
  <section>
    <div class="wrapper">
      <nuxt-link to="/mon-compte/mes-requetes">Retourner</nuxt-link>
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
        <div class="response" v-for="response in responses" :key="response.resId">
          <p>{{ response.resContent }}</p>
        </div>
      </div>
      <div v-else>
        <p>Aucune reponse pour l'instant, revenez régulièrement pour voir si vous avez de nouvelles réponses...</p>
      </div>

      <form @submit.prevent="sendResponse()">
        <input type="text" placeholder="Ecrire une message..." v-model="resContent" required />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head() {
    return {
      title: `Requête #${this.request.reqId} — eCollectivités`,
    };
  },
  async asyncData({ params, $axios, store, error }) {
    const reqId = params.reqId;

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
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
  computed: {
    ...mapGetters(["token"]),
    reqAttachments() {
      let attachments = this.request.reqAttachments.split(";");
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
      console.log("sending response");
      let formData = new FormData();
      const data = {
        reqId: this.request.reqId,
        resContent: this.resContent,
      };

      formData.append("data", JSON.stringify(data));

      for (const file of this.resAttachments) {
        formData.append(`attachements`, file);
      }

      console.log(formData);
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.token}`,
        };
        const response = await this.$axios.$post("/responses", formData, { headers });
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.log(error);
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

form {
  margin: 3rem 0;
}

input {
  background-color: transparent;
  border: 1px solid;
  border-radius: 3px;
  box-shadow: none;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  width: 100%;
  margin-bottom: 1rem;

  &:focus {
    border-color: $primary-variant;
    outline: 0;
  }

  &[type="submit"] {
    @include button;
  }
}
</style>
