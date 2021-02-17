<template>
  <div class="usuario">
      <h2>Usuário</h2>
      <hr>
      <router-view></router-view>
      <button sucesso @click="irParaInicio">Voltar</button>
  </div>
</template>

<script>
export default {
    methods: {
        irParaInicio() {
            // this.$router.push('/')
            this.$router.push({name: 'inicio'})
        }
    }
}
</script>

<style>

</style>