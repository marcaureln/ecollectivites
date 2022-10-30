<template>
  <form @submit.prevent="sendResponse()">
    <input v-model="resContent" type="text" placeholder="Ecrire une message..." required />

    <div class="box--bottom">
      <div>
        <input id="attachements" type="file" name="attachements" multiple @change="handleFileUpload" />
      </div>

      <div class="box--actions">
        <div v-if="isAgent" class="request-status">
          <label for="request-status">Statut requête</label>
          <select id="request-status" v-model.number="requestStatusId">
            <option v-for="status in requestStatus" :key="status.reqStatusId" :value="status.reqStatusId">
              {{ status.reqStatusLabel }}
            </option>
          </select>
        </div>
        <input type="submit" value="Envoyer" />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    reqId: {
      type: String,
      required: true,
    },
    reqStatusId: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    isAgent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      resContent: "",
      resAttachments: [],
      requestStatus: [],
      requestStatusId: this.reqStatusId,
    };
  },
  async fetch() {
    this.requestStatus = await this.$axios.$get("/requests/status");
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

        if (this.isAgent && this.requestStatusId !== this.reqStatusId) {
          await this.$axios.$post(
            `/requests/${this.reqId}/update`,
            { reqId: this.reqId, reqStatusId: this.requestStatusId },
            { headers: { Authorization: `Bearer ${this.token}` } }
          );
        }

        this.resContent = "";
        this.resAttachments = [];
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
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

input {
  background-color: transparent;
  border: none;
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

.box--bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box--actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.request-status {
  display: flex;
  margin-right: 1rem;

  label {
    display: inline-block;
    margin-right: 0.5rem;
  }
}
</style>
