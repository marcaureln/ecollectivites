<template>
  <BaseModal
    :isActive="isActive"
    width="350px"
    @close="close()"
    class="wrapper"
  >
    <span class="close-btn" @click="closeModal()"> &times; </span>
    <h1>Se connecter</h1>
    <div>
      <label for="email">Email<span class="required">*</span></label>
      <div>
        <input type="email" id="email" v-model="email" required />
      </div>
    </div>
    <div>
      <label for="password">Mot de passe<span class="required">*</span></label>
      <div>
        <input type="password" id="password" v-model="password" required />
      </div>
    </div>
    <button class="login-btn" @click="loginWithEmail()">Se connecter</button>
    <button class="phone-login-btn">Se connecter avec son téléphone</button>
    <div class="register-link">
      <a><span class="bold">Pas de compte ?</span> S'inscrire</a>
    </div>
  </BaseModal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions([
      "login", //also supports payload `this.nameOfAction(amount)`
    ]),
    async loginWithEmail() {
      const response = await this.login({
        method: "email",
        email: this.email,
        password: this.password,
      });

      if (response === true) {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.close-btn {
  cursor: pointer;
  float: right;
}

.required {
  color: #d72323;
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

.login-btn {
  @include button;
  width: 100%;

  &:disabled {
    cursor: not-allowed;
  }
}

.phone-login-btn {
  @include button;
  @include button-inverted;
  width: 100%;
  margin-top: 1rem;
}

.register-link {
  margin-top: 2rem;
  font-size: 1rem;
  text-align: center;
}

.login-error {
  color: $error;
}

.bold {
  font-weight: bold;
}
</style>
