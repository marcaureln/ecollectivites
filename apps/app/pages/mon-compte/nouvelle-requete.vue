<template>
  <section>
    <h1>Faire une requête</h1>
    <form>
      <p>Champs obligatoire <em>*</em></p>
      <div class="grouped">
        <!-- Select collectivite type -->
        <div class="form-group">
          <label for="collect-type">Type de collectivité <em>*</em></label>
          <select id="collect-type" class="form-control" v-model="collectTypeId" required>
            <option value="">--Choisir un type de collectivité--</option>
            <option v-for="type in collectTypes" :key="type.collectTypeId" :value="type.collectTypeId">
              {{ type.collectTypeLabel }}
            </option>
          </select>
        </div>

        <!-- Select collectivite -->
        <div class="form-group">
          <label for="collect">Collectivité <em>*</em></label>
          <select id="collect-type" class="form-control" v-model="collectId" :disabled="!collectTypeId" required>
            <option value="">--Choisir une collectivité--</option>
            <option v-for="collect in filteredCollects" :key="collect.collectId" :value="collect.collectId">
              {{ collect.collectName }}
            </option>
          </select>
        </div>
      </div>

      <!-- Select request type -->
      <div class="form-group">
        <label for="request-type">Type de requête <em>*</em></label>
        <select id="request-type" class="form-control" v-model="reqType" required>
          <option value="">--Choisir un type de requête--</option>
          <option v-for="type in requestTypes" :key="type.reqTypeId" :value="type.reqTypeId">
            {{ type.reqTypeLabel }}
          </option>
        </select>
      </div>

      <!-- Request content -->
      <div class="form-group">
        <label for="request-content">Détails Requête <em>*</em></label>
        <textarea
          name="request-content"
          id="request-content"
          cols="50"
          rows="10"
          placeholder="Comment pouvons-nous vous aider ? Commencez par une brève introduction puis ajouter toutes les informations qui pourrait être utiles au traitement de votre requête..."
          v-model="reqContent"
          required
        ></textarea>
      </div>

      <!-- Upload files -->
      <div class="form-group">
        <label for="attachements">Fichiers</label>
        <input type="file" name="attachements" id="attachements" multiple @change="handleFileUpload" />
      </div>
      <!-- Submit -->
      <input type="submit" @click.prevent="submitRequest()" value="Envoyer" />
    </form>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  middleware: ["auth"],
  head() {
    return {
      title: "Faire une Requête — eCollectivités",
    };
  },
  async asyncData({ $axios, store }) {
    const requestTypes = await $axios.$get("/requests/types");
    const collectTypes = await $axios.$get("/collectivites/types");
    const collects = await $axios.$get("/collectivites");
    let userCollect = { collectTypeId: "", collectId: "" };

    if (store.state.collectId) {
      userCollect = await $axios.$get(`/collectivites/${store.state.collectId}`);
    }

    return {
      collectTypeId: userCollect.collectTypeId,
      collectId: userCollect.collectId,
      requestTypes,
      collectTypes,
      collects,
      userCollect,
    };
  },
  computed: {
    ...mapState({ userCollectId: "collectId", userId: "userId" }),
    ...mapGetters(["token"]),
    filteredCollects() {
      return this.collects.filter((collect) => collect.collectTypeId == this.collectTypeId);
    },
  },
  data() {
    return {
      reqType: "",
      reqContent: "",
      attachements: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.attachements = files;
    },
    async submitRequest() {
      let formData = new FormData();
      const data = {
        reqType: this.reqType,
        reqContent: this.reqContent,
        collectId: this.collectId,
        userId: this.userId,
      };

      formData.append("data", JSON.stringify(data));

      for (const file of this.attachements) {
        formData.append(`attachements`, file);
      }

      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.token}`,
        };
        const response = await this.$axios.$post("/requests", formData, { headers });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
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

form {
  width: 600px;
  margin: auto;
}

label {
  display: block;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

input {
  &[type="file"]::file-selector-button {
    @include button($secondary, $on-secondary, $secondary-variant);
    margin-right: 1em;
  }

  &[type="submit"] {
    @include button;
  }
}

textarea,
select {
  background-color: transparent;
  border: 1px solid;
  border-radius: 3px;
  box-shadow: none;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  width: 100%;

  &:focus {
    border-color: $primary-variant;
    outline: 0;
  }
}

textarea {
  min-height: 6.5rem;
}

em {
  font-size: 1em;
  font-weight: bold;
  font-style: normal;
  color: $error;
}

.form-group {
  margin-bottom: 2rem;
  width: 100%;
}

.grouped {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
}
</style>
