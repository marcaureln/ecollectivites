export const state = () => ({
  userId: null,
  firstname: null,
  lastname: null,
  role: null,
  phone: null,
  email: null,
  collectId: null,
});

export const getters = {
  isLoggedIn(state, getters) {
    return getters.token != null;
  },
  token() {
    if (process.client) {
      return localStorage.getItem("token");
    }
  },
  loginMethod() {
    if (process.client) {
      return localStorage.getItem("method");
    }
  },
};

export const mutations = {
  saveUser(state, { userId, firstname, lastname, role, phone, email, collectId }) {
    state.userId = userId;
    state.firstname = firstname;
    state.lastname = lastname;
    state.role = role;
    state.collectId = collectId;
    state.phone = phone;
    state.email = email;
  },
};

export const actions = {
  async login({ commit }, { method, phone, verifyToken, email, password }) {
    if (method === "phone") {
      try {
        const headers = { Authorization: `Bearer ${verifyToken}` };
        const user = await this.$axios.$post("/auth/login", { method: "phone", phone }, { headers });
        commit("saveUser", user);
        localStorage.setItem("token", user.token);
        localStorage.setItem("method", "phone");
        return true;
      } catch (error) {
        return false;
      }
    } else if (method === "email") {
      try {
        const user = await this.$axios.$post("/auth/login", { method: "email", email, password });
        commit("saveUser", user);
        localStorage.setItem("token", user.token);
        localStorage.setItem("method", "email");
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  },
  async fetchUser({ commit }, { token }) {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const user = await axios.$get("/me", { headers });
      commit("saveUser", user);
      return user;
    } catch (e) {
      return false;
    }
  },
  logout({ commit }) {
    commit("saveUser", {
      userId: null,
      firstname: null,
      lastname: null,
      role: null,
      phone: null,
      email: null,
      collectId: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("method");
    window.location.reload();
  },
};
