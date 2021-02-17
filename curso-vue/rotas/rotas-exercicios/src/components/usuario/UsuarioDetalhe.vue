<template>
  <div class="usuario-detalhe">
    <h3>Usuário Detalhe</h3>
    <hr />
    <p><strong>Código: </strong> {{ id }}</p>
    <!-- :to="`/usuario/${id}/editar`" -->
    <router-link
      tag="button"
      primario
      :to="{ name: 'editarUsuario', params: { id }, 
      query: {completo: true, lingua: 'pt'},
      hash: '#rodape' }"
    >
      Editar
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["id"],
  beforeRouteEnter(to,from,next) {
      const autenticado = true

      autenticado ? next() : next(false)
  }
  // data() {
  //     return {
  //         id: this.$route.params.id
  //     }
  // },
  // watch: {
  //     $route(to){
  //         this.id = to.params.id
  //     }
  // },
};
</script>

<style>
</style>