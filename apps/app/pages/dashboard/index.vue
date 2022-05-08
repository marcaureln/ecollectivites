<template>
  <div class="overview--wrapper">
    <h1>Bienvenue agent !</h1>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  head() {
    return {
      title: "Vue d'ensemble — Dashboard eCollectivités",
    };
  },
};
</script>

<style lang="scss" scoped>
.overview--wrapper {
  width: 100%;
  height: 100%;
  padding: 3rem;
  background: #f6f6f6;
}
</style>
