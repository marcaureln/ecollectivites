<template>
  <section class="wrapper">
    <h1>Se connecter</h1>
    <div v-if="method === 'email'" class="email-login-form">
      <div>
        <label for="email">Email :</label>
        <div>
          <input type="email" id="email" v-model="email" required />
        </div>
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <div>
          <input type="password" id="password" v-model="password" required />
        </div>
      </div>
      <button class="login-btn" @click="loginWithEmail()">Se connecter</button>
      <button class="phone-login-btn" @click="changeMethod('phone')">Se connecter avec son téléphone</button>
    </div>
    <div v-else class="phone-login-form">
      <div>
        <label for="phone">Numéro de téléphone :</label>
        <div>
          <input type="tel" id="phone" v-model="phone" required />
        </div>
      </div>
      <p v-if="!isCodeSended">
        <a @click="alreadyHaveCode()">J'ai déjà un code</a>
      </p>
      <div v-if="isCodeSended">
        <label for="code">Code de vérification :</label>
        <div>
          <input id="code" v-model="code" required />
        </div>
        <p>Pas reçu de code ? <a @click="reSendCode()">Renvoyer</a></p>
      </div>
      <button class="login-btn" @click="loginWithPhone()">
        {{ isCodeSended ? "Vérifier et se connecter" : "Continuer" }}
      </button>
      <button class="phone-login-btn" @click="changeMethod('email')">Se connecter avec son email</button>
    </div>
    <nuxt-link to="/inscription" class="register">Pas de compte ? S'inscrire</nuxt-link>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware({ store, redirect }) {
    if (store.getters.isLoggedIn) {
      redirect("/");
    }
  },
  head() {
    return {
      title: "Se connecter — eCollectivités",
    };
  },
  data() {
    return {
      method: "email",
      email: "",
      password: "",
      phone: "",
      code: "",
      isCodeSended: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async loginWithEmail() {
      const response = await this.login({
        method: "email",
        email: this.email,
        password: this.password,
      });

      if (response === true) {
        window.location.reload();
      }
    },
    async loginWithPhone() {
      if (this.isCodeSended) {
        const verifyToken = (await this.checkVerificationCode({ phone: this.phone, code: this.code })).token;
        const loginResponse = await this.login({
          method: "phone",
          phone: this.phone,
          code: this.code,
          verifyToken,
        });

        if (loginResponse === true) {
          window.location.reload();
        }
      } else {
        this.sendVerificationCode({ phone: this.phone });
        this.isCodeSended = true;
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
    reSendCode() {
      this.isCodeSended = false;
    },
    alreadyHaveCode() {
      this.isCodeSended = true;
    },
    changeMethod(method) {
      this.method = method;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 400px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
}

.close-btn {
  cursor: pointer;
  float: right;
}

h1 {
  margin: 1rem 0;
}

label {
  font-size: 1rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0 1rem 0;
  font-size: 1rem;
}

a {
  font-weight: bold;
}

p {
  margin: 0;
  font-size: 1rem;
}

.login-btn {
  @include button;
  width: 100%;
  margin-top: 1rem;
}

.phone-login-btn {
  @include button;
  @include button-inverted;
  width: 100%;
  margin-top: 1rem;
}

.register {
  margin-top: 2rem;
  font-size: 1rem;
  text-align: center;
}
</style>
