<template>
  <section>
    <h1>Qui sommes-nous ?</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda quis,
      animi dignissimos autem perferendis obcaecati, inventore qui omnis tempore
      error, quia rerum quod consequuntur ut fuga cupiditate natus suscipit
      doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quisquam temporibus illo voluptate ea vitae architecto porro provident!
      Explicabo ipsam, quaerat illo ducimus cum quasi laboriosam corporis
      doloremque exercitationem error possimus.
    </p>
    <button>En savoir plus</button>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  font-family: "Barlow Condensed", "Roboto", sans-serif;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  font-size: 4rem;
  margin: 0;
  margin-bottom: 1rem;
}

p {
  width: 40%;
  line-height: 1.5rem;
  margin-bottom: 2rem;
}

button {
  @include button($secondary, $on-secondary, $secondary-variant);
}
</style>
