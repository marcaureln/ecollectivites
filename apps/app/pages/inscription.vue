<template>
  <section>
    <h1>Créer un compte</h1>
    <div v-if="!isLoginMethodProvided">
      <!-- Email sign up form -->
      <form v-if="method == 'email'" class="" @submit.prevent="next()">
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="next-btn">Continuer</button>
        <button class="phone-login-btn" @click="changeMethod('phone')">Utiliser son téléphone</button>
      </form>

      <!-- Phone sign up form -->
      <form v-else class="" @submit.prevent="next()">
        <div class="form-group">
          <label for="phone">Numéro de téléphone :</label>
          <input type="tel" id="phone" v-model="phone" required :disabled="isCodeSended" />
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
          <input type="lastname" id="lastname" v-model="lastname" required />
        </div>
        <div class="form-group">
          <label for="firstname">Prénoms :</label>
          <input type="firstname" id="firstname" v-model="firstname" required />
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
export default {
  layout: "auth-layout",
  middleware({ store, redirect }) {
    if (store.getters.isLoggedIn) {
      redirect("/");
    }
  },
  head() {
    return {
      title: "S'inscrire — eCollectivités",
    };
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
  methods: {
    async next() {
      if (this.method == "email") {
        this.isLoginMethodProvided = true;
      } else {
        if (this.isCodeSended) {
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
      }
    },
    async register() {
      let user;

      try {
        if (this.method == "phone") {
          const headers = { Authorization: `Bearer ${verifyToken}` };
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
        windows.alert(error.message);
      }

      if (user) {
        this.$router.push("/connexion");
      }
    },
    async sendVerificationCode({ phone }) {
      // Response: { message }
      return await this.$axios.$post("/auth/verify/verification", { phone });
    },
    async checkVerificationCode({ phone, code }) {
      // Response: { phone, token }
      return await this.$axios.$post("/auth/verify/verification-check", { phone, code });
    },
    findCollectTypeLabel(collectTypeId) {
      return this.collectTypes.find((collectType) => collectType.collectTypeId == collectTypeId).collectTypeLabel;
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
