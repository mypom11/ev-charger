<template>
  <div class="location-select" :class="{ open: locationFlag }">
    <div class="open-btn" @click="locationFlag = !locationFlag">
      <span>
        <font-awesome-icon :icon="['fas', 'bars-staggered']" />
      </span>
      <h3>{{ getZcodeName($route.query.zcode) }}</h3>
    </div>
    <ul class="location-list" v-if="locationFlag">
      <li v-for="(list, i) in zcode" :key="i" @click="locationChange(list)">
        {{ list.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { zcode } from "@/modules/common";
import { mapMutations } from "vuex";

export default {
  name: "LocationList",
  data() {
    return {
      zcode: zcode,
      locationFlag: false,
    };
  },

  methods: {
    ...mapMutations(["SET_SELECTED_STAT"]),
    getZcodeName() {
      return zcode.filter(
        (item) => item.zcode === Number(this.$route.query.zcode)
      )[0].name;
    },

    locationChange(list) {
      this.$router.push({ name: "MainPage", query: { zcode: list.zcode } });
      this.SET_SELECTED_STAT(null);
      this.locationFlag = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/_variables.scss";
.location-select {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 50;
  transition: 0.2s;
  .open-btn {
    @include flex(flex-start);
    gap: 20px;
    padding: 10px 20px;
    background: $white;
    border-radius: $border-radius;
    cursor: pointer;
    font-size: rem(20);
    font-weight: 700;
    box-shadow: 1px 1px 6px rgba($color: $black, $alpha: 0.16);
    transition: 0.2s;
    &:hover {
      box-shadow: 6px 6px 6px rgba($color: $black, $alpha: 0.4);
    }
  }
  &.open {
    background: $white;
    border-radius: $border-radius;
    height: 50%;
    overflow-y: hidden;
    min-width: 200px;
    box-shadow: 1px 1px rgba($color: $black, $alpha: 0.16);
    .location-list {
      font-size: rem(20);
      padding: 10px 0;
      max-height: calc(100% - 68px);
      overflow-y: auto;
      > li {
        padding: 10px 20px;
        cursor: pointer;
        &:hover {
          background: $secondary;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
