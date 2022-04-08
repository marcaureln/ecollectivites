<template>
  <section class="wrapper">
    <h1>Mon Compte</h1>
    <form @submit.prevent="updateInfo()">
      <div class="form-group">
        <label for="lastname">Nom :</label>
        <div>
          <input type="lastname" id="lastname" v-model="lastname" required />
        </div>
      </div>
      <div class="form-group">
        <label for="firstname">Prénoms :</label>
        <div>
          <input type="firstname" id="firstname" v-model="firstname" required />
        </div>
      </div>
      <div class="form-group">
        <label for="collect">Collectivité :</label>
        <select id="collect" v-model.number="collectId" disabled>
          <option v-for="collect in collects" :key="collect.collectId" :value="collect.collectId">
            {{ collect.collectName }} ({{ findCollectTypeLabel(collect.collectTypeId) }})
          </option>
        </select>
      </div>
      <button type="submit">Modifier</button>
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware: ["auth"],
  head() {
    return {
      title: "Mon Compte — eCollectivités",
    };
  },
  async asyncData({ $axios, store }) {
    const collectTypes = await $axios.$get("/collectivites/types");
    const collects = await $axios.$get("/collectivites");
    const collectId = store.state.collectId;
    const lastname = store.state.lastname;
    const firstname = store.state.firstname;
    const loginMethod = store.getters.loginMethod;

    return {
      collectTypes,
      collects,
      collectId,
      lastname,
      firstname,
      loginMethod,
      token: store.getters.token,
    };
  },
  methods: {
    ...mapActions(["fetchUser"]),
    findCollectTypeLabel(collectTypeId) {
      return this.collectTypes.find((collectType) => collectType.collectTypeId == collectTypeId).collectTypeLabel;
    },
    async updateInfo() {
      const headers = { Authorization: `Bearer ${this.token}` };
      const response = await this.$axios.$post(
        "/me/update",
        { firstname: this.firstname, lastname: this.lastname, collectId: this.collectId },
        { headers }
      );

      if (response) {
        this.fetchUser();
        window.alert("Informations modifiées avec succès");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 400px;
  margin: 3rem auto;
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
  width: 100%;
  margin: auto;
}

label {
  display: block;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

button,
input[type="submit"] {
  @include button;
  width: 100%;
}

input,
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

.form-group {
  margin-bottom: 2rem;
  width: 100%;
}
</style>
