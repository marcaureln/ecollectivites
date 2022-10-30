<template>
  <div>
    <HomeIntro />
    <HomeHero />
    <HomeHowItWorks />
    <HomeAbout />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  head() {
    return {
      title: "Accueil — eCollectivités",
    };
  },
};
</script>
