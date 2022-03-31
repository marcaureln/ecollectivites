<template>
  <section class="masthead" role="img" aria-label="Image Description"></section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.masthead {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 60%;
  margin: auto;
  height: 50vh;
  overflow: hidden;
  background-size: cover !important;
  background: url("@/assets/img/creation-of-adam.png") no-repeat center center
    scroll;
}
</style>
