<template>
  <div class="mask">
    <div class=""></div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.mask{
  position: fixed;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.2);
}
</style>