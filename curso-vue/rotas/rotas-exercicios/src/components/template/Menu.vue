<template>
  <nav class="menu">
    <ul>
      <router-link to="/" active-class="active" tag="li" exact>
        <a>Início</a>
      </router-link>
      <router-link to="/usuario" active-class="active" tag="li" exact>
        <a>Usuário</a>
      </router-link>    
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>