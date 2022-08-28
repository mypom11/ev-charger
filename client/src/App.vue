<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "~@/assets/scss/common.scss";
.app {
  background: $white;
  border-radius: $border-radius;
  height: calc(100vh - rem(36));
  box-shadow: 1px 1px rgba($color: $black, $alpha: 0.4);
  overflow: hidden;
  position: relative;
}
</style>
