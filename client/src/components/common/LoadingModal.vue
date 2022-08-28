<template>
  <article id="loading">
    <div class="loading-wrap">
      <div class="loading-icon"></div>
      <div class="loading-text">
        <h3>데이터 다운로드 중입니다.</h3>
        <p>잠시만 기다려주시기 바랍니다.</p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "LoadingModal",
  props: {
    width: String,
    height: String,
    title: String,
  },
  data() {
    return {};
  },
  created() {},
  unmounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables";
$loading-color: #096eb2;
@keyframes loading {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

#loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: $black, $alpha: 0.5);
  z-index: 500;
  .loading-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;

    transform: translate(-50%, -50%);
    text-align: center;
    border: 1px solid $loading-color;
    border-radius: 10px;
    background: #fff;
    box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.16);
    padding: 30px 0;
    .loading-icon {
      height: 60px;
      width: 60px;
      margin: 0 auto 12px;
      &:before {
        content: "";
        box-sizing: border-box;
        display: inline-block;
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 5px solid $loading-color;
        animation: loading 1s infinite;
      }
      &::after {
        content: "";
        box-sizing: border-box;
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 5px solid $loading-color;
        animation: loading 1s 0.5s infinite;
      }
    }
    .loading-text {
      h3 {
        font-size: 24px;
        font-weight: bold;
        color: $loading-color;
        line-height: 1.5;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
      }
    }
  }
}
</style>
