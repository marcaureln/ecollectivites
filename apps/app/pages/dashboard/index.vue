<template>
  <div class="overview--wrapper">
    <div class="overview--header">
      <div class="greeting">
        <h2>{{ collectivite.collectName }}</h2>
        <h1>Bienvenue {{ fullname }} !</h1>
      </div>

      <div class="actions">
        <h2>Actions rapides</h2>
        <nuxt-link to="/dashboard/inbox"><ion-icon name="arrow-forward"></ion-icon>Boite de réception</nuxt-link>
        <nuxt-link to="/dashboard/annuaire"><ion-icon name="arrow-forward"></ion-icon>Annuaire</nuxt-link>
      </div>
    </div>

    <div class="overview--activity">
      <h2>Activités</h2>
      <div class="stats--grid">
        <DashboardOverviewStatsCard
          v-for="(stats, index) in requestsPerStatus"
          :key="index"
          :label="stats.label"
          :count="stats.count"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  async asyncData({ $axios, store }) {
    const headers = { Authorization: `Bearer ${store.getters.token}` };
    const user = store.state.user;
    const collectivite = await $axios.$get(`/collectivites/${user.collectId}`);
    const requests = await $axios.$get(`/collectivites/${store.state.user.collectId}/requests`, { headers });
    const requestStatus = await $axios.$get("/requests/status");
    const requestsPerStatus = [];

    for (const status of requestStatus) {
      requestsPerStatus.push({
        label: status.reqStatusLabel,
        count: requests.filter((request) => request.reqStatusId === status.reqStatusId).length,
      });
    }

    return {
      user,
      collectivite,
      requestsPerStatus,
    };
  },
  head() {
    return {
      title: "Vue d'ensemble — Dashboard eCollectivités",
    };
  },
  computed: {
    fullname() {
      return this.user.firstname + " " + this.user.lastname;
    },
  },
};
</script>

<style lang="scss" scoped>
.overview--wrapper {
  width: 100%;
  height: 100%;
  padding: 3rem;
  background: $dashboard-background;
  overflow-y: auto;
}

.overview--header {
  display: flex;
  margin-bottom: 6rem;
}

.greeting {
  width: 50%;
}

.actions {
  width: 50%;
  display: flex;
  flex-direction: column;

  ion-icon {
    margin-right: 1rem;
  }

  a {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}

.stats--grid {
  display: flex;
  gap: 3rem;
}
</style>
