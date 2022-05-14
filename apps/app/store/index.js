import User from "~/models/user";

export const state = () => ({
  user: null,
});

export const getters = {
  isLoggedIn(state, getters) {
    return getters.token != null;
  },
  token() {
    return localStorage.getItem("token");
  },
  loginMethod() {
    return localStorage.getItem("method");
  },
};

export const mutations = {
  updateUser(state, user) {
    state.user = user;
  },
  removeUser(state) {
    state.user = null;
  },
};

export const actions = {
  async login({ commit }, { method, phone, verifyToken, email, password }) {
    let response;

    try {
      if (method === "phone") {
        const headers = { Authorization: `Bearer ${verifyToken}` };
        response = await this.$axios.$post("/auth/login", { method: "phone", phone }, { headers });
      } else if (method === "email") {
        response = await this.$axios.$post("/auth/login", { method: "email", email, password });
      } else {
        throw new Error("Invalid login method");
      }
    } catch (error) {
      return false;
    }

    commit("updateUser", response);
    localStorage.setItem("token", response.token);
    localStorage.setItem("method", method);
    return true;
  },
  async sendVerificationCode(context, { phone }) {
    return await this.$axios.$post("/auth/verify/verification", { phone });
  },
  async checkVerificationCode(context, { phone, code }) {
    return await this.$axios.$post("/auth/verify/verification-check", { phone, code });
  },
  async fetchUser({ commit }, { token }) {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await this.$axios.$get("/me", { headers });
      const user = new User(response);
      commit("updateUser", user);
      return user;
    } catch (e) {
      return false;
    }
  },
  logout({ commit }) {
    commit("removeUser");
    localStorage.removeItem("token");
    localStorage.removeItem("method");
    window.location.reload();
  },
};
