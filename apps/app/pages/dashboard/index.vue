<template>
  <div>
    <h1>Bienvenue agent !</h1>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  layout: "dashboard",
};
</script>

<style lang="scss" scoped></style>
