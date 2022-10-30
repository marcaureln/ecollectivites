<template>
  <section class="wrapper">
    <h1>Se connecter</h1>
    <form v-if="method === 'email'" class="email-login-form" @submit.prevent="loginWithEmail()">
      <div>
        <label for="email">Email :</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit" class="login-btn">Se connecter</button>
      <button type="button" class="phone-login-btn" @click="changeMethod('phone')">
        Se connecter avec son téléphone
      </button>
    </form>
    <form v-else class="phone-login-form" @submit.prevent="loginWithPhone()">
      <div>
        <label for="phone">Numéro de téléphone :</label>
        <input id="phone" v-model="phone" type="tel" :disabled="isCodeSended" required />
      </div>
      <p v-if="!isCodeSended">
        <a @click="alreadyHaveCode()">J'ai déjà un code</a>
      </p>
      <div v-if="isCodeSended">
        <div>
          <label for="code">Code de vérification :</label>
          <input id="code" v-model="code" required />
        </div>
        <p>Pas reçu de code ? <a @click="reSendCode()">Renvoyer</a></p>
      </div>
      <button type="submit" class="login-btn">{{ isCodeSended ? "Vérifier et se connecter" : "Continuer" }}</button>
      <button type="button" class="phone-login-btn" @click="changeMethod('email')">Se connecter avec son email</button>
    </form>
    <nuxt-link to="/inscription" class="register">Pas de compte ? S'inscrire</nuxt-link>
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
  head() {
    return {
      title: "Se connecter — eCollectivités",
    };
  },
  methods: {
    ...mapActions(["login", "sendVerificationCode", "checkVerificationCode"]),
    async loginWithEmail() {
      const response = await this.login({
        method: "email",
        email: this.email,
        password: this.password,
      });

      if (response.loggedIn === true) {
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

        if (loginResponse.loggedIn === true) {
          window.location.reload();
        } else if (loginResponse.expiredPassword === true) {
          this.$router.push({
            path: "/reinitialiser-mdp",
            query: { email: this.email, redirect: "/connexion" },
          });
        }
      } else {
        this.sendVerificationCode({ phone: this.phone });
        this.isCodeSended = true;
      }
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
