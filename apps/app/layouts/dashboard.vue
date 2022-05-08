<template>
  <div class="dashboard--wrapper">
    <DashboardSidebar />
    <div class="dashboard--main">
      <DashboardNavbar />
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dashboard--wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.dashboard--main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
