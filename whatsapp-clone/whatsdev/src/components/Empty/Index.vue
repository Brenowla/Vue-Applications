<template>
  <div class="empty">
    <div
      class="container full-width full-height column items-center justify-center"
    >
      <q-img
        src="../../assets/coneccted.png"
        height="250px"
        width="250px"
      ></q-img>
      <h4>Mantenha o celular conectado</h4>
      <span>O Whats conecta-se ao seu telefone.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyChat",
};
</script>


<style lang="scss" scoped>
.empty {
  height: calc(100vh);
  min-width: 800px;
  width: calc(100vw - 410px);
  background-color: $empty-background;
}

.container {
  h4 {
    width: 350px;
    text-align: center;
    margin: 12px 0px;
    color: $font-empty;
  }

  span {
    width: 450px;
    text-align: center;
    color: $font-grey;
  }
}
</style>