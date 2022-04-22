export default async function ({ store, redirect, error, route }) {
  if (!store.getters.isLoggedIn) {
    redirect("/connexion");
  } else {
    if (!hasUser(store.state)) {
      const user = await store.dispatch("fetchUser", { token: store.getters.token });

      if (user === false) {
        // Response is false when the user cannot be found and the token is either invalid or expired
        store.dispatch("logout");
        redirect("/connexion");
        return;
      }
    }

    if (requireAgent(route) && !isAgent(store.state)) {
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

function isAgent(user) {
  return ["AGENT", "ADMIN"].includes(user.role);
}

function hasUser(user) {
  return user.userId && user.firstname && user.lastname && user.role && user.phone && user.email && user.collect;
}
