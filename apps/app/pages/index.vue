<template>
  <div>
    <HomeIntro />
    <HomeHero />
    <HomeHowItWorks />
    <HomeAbout />
    <TheFooter />
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
