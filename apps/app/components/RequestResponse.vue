<template>
  <div class="response--wrapper">
    <div class="response--header">
      <h3 class="response--author">{{ resAuthor }}</h3>
      <div class="response--date">{{ new Date(response.resSendDate).toLocaleDateString() }}</div>
    </div>

    <p class="response--content">{{ response.resContent }}</p>

    <ul v-if="resAttachments.length > 0">
      <li v-for="(file, index) in resAttachments" :key="index">
        <a :href="file">{{ extractFilename(file) }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    response: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isAgent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    resAuthor() {
      if (this.isAgent) {
        return this.response.userId === this.userId ? "Vous" : "Utilisateur";
      }

      return this.response.userId === this.userId ? "Vous" : "Agent";
    },
    resAttachments() {
      const attachments = this.response.resAttachments.split(";");
      attachments.pop(); // Pop because the separator at the end of the string append an empty string to the array.
      return attachments;
    },
  },
  methods: {
    extractFilename(file) {
      return file.split("/").pop();
    },
  },
};
</script>

<style lang="scss" scoped>
.response--wrapper {
  padding: 1rem 0;
}

.response--header {
  display: flex;
  align-items: center;
}

.response--author {
  font-weight: bold;
  margin-right: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 0.5rem;

  li {
    margin-bottom: 0.5rem;
  }

  a {
    font-weight: bold;
  }
}
</style>
