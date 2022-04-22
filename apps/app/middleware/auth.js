export default function ({ store, redirect, error, route }) {
  console.log("in auth middleware");
  if (!store.getters.isLoggedIn) {
    console.log("user not logged in");
    redirect("/connexion");
  } else {
    console.log("user logged in");
    if (store.state.user == null) {
      store.dispatch("fetchUser", { token: store.getters.token });
    }

    const user = store.state.user;

    console.log(user);
    if (!!user) {
      console.log("invalid token");
      // Response is false when the user cannot be found and the token is either invalid or expired
      store.dispatch("logout");
      redirect("/connexion");
    }

    if (requireAgent(route) && !user.isAgent) {
      console.log("require agent route");
      error({
        statusCode: 403,
        message: "Seuls les agents peuvent accéder à cette page",
      });
    }
  }
}

function requireAgent(route) {
  const guardedRoutes = ["/dashboard"];
  const exceptRoutes = ["/dashboard/connexion"];

  return (
    exceptRoutes.includes(route.path) == false &&
    guardedRoutes.find((guardedRoute) => route.path.startsWith(guardedRoute))
  );
}
