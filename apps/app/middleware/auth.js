export default function ({ store, redirect, error, route }) {
  if (!store.getters.isLoggedIn) {
    redirect("/connexion");
    // error({
    //   statusCode: 401,
    //   message: "Seuls les membres peuvent accéder à cette page",
    // });
  } else {
    if (
      !store.state.userId ||
      !store.state.firstname ||
      !store.state.lastname ||
      !store.state.role ||
      !store.state.phone ||
      !store.state.email ||
      !store.state.collectId
    ) {
      store.dispatch("fetchUser", { token: store.getters.token }).then((response) => {
        if (response === false) {
          store.dispatch("logout");
          redirect("/connexion");
        }
      });
    }
  }
}
