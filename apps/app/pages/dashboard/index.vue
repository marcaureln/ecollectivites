<template>
  <div class="wrapper">
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
.wrapper {
  width: 100%;
  padding: 3rem;
  background: #eee;
}
</style>
