<template>
  <div class="container">
    <div class="http404">
      <p>The page is not existed</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "errorPage",
  computed: {},
};
</script>

<style lang="scss" scoped>
.container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;
  color: black;
}
</style>
