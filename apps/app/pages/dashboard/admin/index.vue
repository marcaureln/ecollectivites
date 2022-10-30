<template>
  <div></div>
</template>

<script>
export default {
  middleware({ redirect }) {
    redirect("/dashboard/admin/ajouter-agent");
  },
};
</script>
