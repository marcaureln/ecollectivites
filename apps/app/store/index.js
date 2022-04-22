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
      switch (method) {
        case "phone":
          const headers = { Authorization: `Bearer ${verifyToken}` };
          response = await this.$axios.$post("/auth/login", { method: "phone", phone }, { headers });
          break;
        case "email":
          response = await this.$axios.$post("/auth/login", { method: "email", email, password });
          break;
        default:
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
