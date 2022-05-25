<template>
  <div class="stats--wrapper">
    <h3 class="stats-label">{{ label }}</h3>
    <h4 class="stats-count">{{ count }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.stats--wrapper {
  height: 150px;
  width: 150px;
  padding: 1rem;
  background: darken($color: $dashboard-background, $amount: 25);
}

.stats-label {
  font-size: 1.25rem;
  margin-top: 0;
}

.stats-count {
  font-size: 3rem;
  font-weight: lighter;
  text-align: right;
  margin: 0;
}
</style>
