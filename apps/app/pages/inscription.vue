<template>
  <section>
    <h1>Créer un compte</h1>
    <div v-if="!isLoginMethodProvided">
      <!-- Email sign up form -->
      <form v-if="method == 'email'" class="" @submit.prevent="next()">
        <div class="form-group">
          <label for="email">Email :</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit" class="next-btn">Continuer</button>
        <button class="phone-login-btn" @click="changeMethod('phone')">Utiliser son téléphone</button>
      </form>

      <!-- Phone sign up form -->
      <form v-else class="" @submit.prevent="next()">
        <div class="form-group">
          <label for="phone">Numéro de téléphone :</label>
          <input id="phone" v-model="phone" type="tel" required :disabled="isCodeSended" />
        </div>
        <div v-if="isCodeSended" class="form-group">
          <label for="code">Code de vérification :</label>
          <input id="code" v-model="code" required />
        </div>
        <button type="submit" class="login-btn">Continuer</button>
        <button class="phone-login-btn" @click="changeMethod('email')">Utiliser son email</button>
      </form>

      <nuxt-link to="/connexion" class="login">Déjà un compte ? Se connecter</nuxt-link>
    </div>
    <div v-else>
      <!-- Personal information -->
      <form @submit.prevent="register()">
        <div class="form-group">
          <label for="lastname">Nom :</label>
          <input id="lastname" v-model="lastname" type="lastname" required />
        </div>
        <div class="form-group">
          <label for="firstname">Prénoms :</label>
          <input id="firstname" v-model="firstname" type="firstname" required />
        </div>
        <div class="form-group">
          <label for="collect">Collectivité</label>
          <select id="collect" v-model.number="collectId" required>
            <option value="0">--Choisir une collectivité--</option>
            <option v-for="collect in collects" :key="collect.collectId" :value="collect.collectId">
              {{ collect.collectName }} ({{ findCollectTypeLabel(collect.collectTypeId) }})
            </option>
          </select>
        </div>
        <button type="submit" class="login-btn">S'inscrire</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: "default-auth",
  middleware({ store, redirect }) {
    if (store.getters.isLoggedIn) {
      redirect("/");
    }
  },
  async asyncData({ $axios }) {
    const collectTypes = await $axios.$get("/collectivites/types");
    const collects = await $axios.$get("/collectivites");

    return {
      collectTypes,
      collects,
    };
  },
  data() {
    return {
      method: "email",
      email: "",
      password: "",
      phone: "",
      code: "",
      verifyToken: "",
      firstname: "",
      lastname: "",
      collectId: 0,
      isCodeSended: false,
      isLoginMethodProvided: false,
    };
  },
  head() {
    return {
      title: "S'inscrire — eCollectivités",
    };
  },
  methods: {
    ...mapActions(["login", "sendVerificationCode", "checkVerificationCode"]),
    async next() {
      if (this.method === "email") {
        this.isLoginMethodProvided = true;
      } else if (this.isCodeSended) {
        try {
          const verifyToken = (await this.checkVerificationCode({ phone: this.phone, code: this.code })).token;
          if (verifyToken) {
            this.verifyToken = verifyToken;
            this.isLoginMethodProvided = true;
          }
        } catch (error) {
          window.alert("Code invalide");
        }
      } else {
        this.sendVerificationCode({ phone: this.phone });
        this.isCodeSended = true;
      }
    },
    async register() {
      let user;

      try {
        if (this.method === "phone") {
          const headers = { Authorization: `Bearer ${this.verifyToken}` };
          user = await this.$axios.$post(
            "/auth/signup",
            {
              method: this.method,
              phone: this.phone,
              firstname: this.firstname,
              lastname: this.lastname,
              collectId: this.collectId,
            },
            { headers }
          );
        } else {
          user = await this.$axios.$post("/auth/signup", {
            method: this.method,
            email: this.email,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            collectId: this.collectId,
          });
        }
      } catch (error) {
        this.$toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
      }

      if (user) {
        try {
          const loginResponse = await this.login({
            method: this.method,
            email: this.email,
            password: this.password,
            phone: this.phone,
            code: this.code,
            verifyToken: this.verifyToken,
          });

          if (loginResponse === true) {
            this.$router.push("/");
          }
        } catch (error) {
          this.$toast.error(
            "Nous n'avons pas pu vous connecter automatiquement. Vous serez redirigé vers la page de connexion dans un instant..."
          );

          setTimeout(function () {
            this.$router.push("/connexion");
          }, 3000);
        }
      }
    },
    findCollectTypeLabel(collectTypeId) {
      return this.collectTypes.find((collectType) => collectType.collectTypeId === collectTypeId).collectTypeLabel;
    },
    changeMethod(method) {
      this.method = method;
      this.email = "";
      this.password = "";
      this.phone = "";
      this.code = "";
      this.verifyToken = "";
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 400px;
  margin: 3rem auto;
}

.form-group {
  margin: 1rem 0;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
}

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

input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0 1rem 0;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
}

button,
input[type="submit"] {
  @include button;
  margin-bottom: 1rem;
  display: block;
  width: 100%;
}

.login {
  font-weight: bold;
  margin-top: 2rem;
  font-size: 1rem;
  text-align: center;
}
</style>
