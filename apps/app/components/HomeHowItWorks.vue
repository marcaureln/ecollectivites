<template>
  <section class="wrapper">
    <div class="content">
      <h1>Comment ça marche ?</h1>
      <div class="steps">
        <div class="step">
          <h2>Créer un compte</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            corrupti ab harum. Blanditiis distinctio ipsum similique architecto
            quo, aspernatur amet nesciunt repudiandae! Itaque, sapiente
            similique? Asperiores sequi distinctio officia animi.
          </p>
        </div>
        <div class="step">
          <h2>Faire sa requête</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            corrupti ab harum. Blanditiis distinctio ipsum similique architecto
            quo, aspernatur amet nesciunt repudiandae! Itaque, sapiente
            similique? Asperiores sequi distinctio officia animi.
          </p>
        </div>
        <div class="step">
          <h2>Consulter</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            corrupti ab harum. Blanditiis distinctio ipsum similique architecto
            quo, aspernatur amet nesciunt repudiandae! Itaque, sapiente
            similique? Asperiores sequi distinctio officia animi.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  background: $primary-variant;
  color: $on-primary;
  margin: 0;
  padding: 4rem 0 6rem 0;
}

.content {
  width: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.steps {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
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

h2 {
  text-align: center;
  font-size: 1.5rem;
}

p {
  text-align: center;
}
</style>
