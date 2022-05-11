<template>
  <form @submit.prevent="sendResponse()">
    <input v-model="resContent" type="text" placeholder="Ecrire une message..." required />
    <label for="attachements">Ajouter des fichiers</label>
    <input id="attachements" type="file" name="attachements" multiple @change="handleFileUpload" />
    <input type="submit" value="Envoyer" />
  </form>
</template>

<script>
export default {
  props: {
    reqId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      resContent: "",
      resAttachments: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.resAttachments = files;
    },
    async sendResponse() {
      const formData = new FormData();
      const data = {
        reqId: this.reqId,
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
        this.$emit("responsesent");
      } catch (error) {
        this.$emit("responsesent", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
