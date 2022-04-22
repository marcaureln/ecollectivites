export default async function ({ store, redirect, error, route }) {
  if (!store.getters.isLoggedIn) {
    redirect("/connexion");
  } else {
    const user = store.state.user || (await store.dispatch("fetchUser", { token: store.getters.token }));

    if (user === null || user === false) {
      store.dispatch("logout");
      redirect("/connexion");
    }

    if (requireAgent(route) && !user.isAgent) {
      return error({
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
