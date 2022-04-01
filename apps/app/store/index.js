export const state = () => ({
  isLoggedIn: false,
  loginMethod: null,
  userId: null,
  firstname: null,
  lastname: null,
  role: null,
  phone: null,
  email: null,
  collectId: null,
  token: null,
});

export const getters = {};

export const mutations = {
  login(state, { method, userId, firstname, lastname, role, phone, email, collectId, token }) {
    state.isLoggedIn = true;
    state.userId = userId;
    state.firstname = firstname;
    state.lastname = lastname;
    state.role = role;
    state.token = token;
    state.collectId = collectId;
    state.loginMethod = method;
    state.phone = method === "phone" ? phone : null;
    state.email = method === "email" ? email : null;
  },
};

export const actions = {
  async login({ commit }, { method, phone, verifyToken, email, password }) {
    if (method === "phone") {
      try {
        const user = await this.$axios.$post(
          "/auth/login",
          {
            method,
            phone,
          },
          {
            headers: { Authorization: `Bearer ${verifyToken}` },
          }
        );
        commit("login", { ...user, method: "phone" });
        return true;
      } catch (error) {
        return false;
      }
    } else if (method === "email") {
      try {
        const user = await this.$axios.$post("/auth/login", {
          method,
          email,
          password,
        });
        commit("login", { ...user, method: "email" });
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  },
  async sendVerificationCode(context, { phone }) {
    try {
      const response = await this.$axios.$post("/auth/verify/verification", { phone });

      return response.message;
    } catch (error) {
      return false;
    }
  },
  async checkVerificationCode(context, { phone, code }) {
    try {
      const response = await this.$axios.$post("/auth/verify/verification-check", { phone, code });

      return response.token;
    } catch (error) {
      return false;
    }
  },
};
