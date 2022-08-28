<template>
  <section>
    <article class="search-section" :class="{ focus: focus === true }">
      <h1>logo</h1>
      <div class="search-box" @click="focus = !focus">
        <!-- <span>
          <font-awesome-icon :icon="['fas', 'bars-staggered']" />
        </span> -->
        <input type="text" placeholder="지역을 선택해 주세요." readonly />
        <!-- <span>
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </span> -->
      </div>
    </article>
    <article class="location-list" :class="{ focus: focus === true }">
      <ul>
        <li
          v-for="(list, i) in zcode"
          :key="i"
          @click="locationSelect(list.zcode)"
        >
          {{ list.name }}
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
import { zcode } from "@/modules/common";

export default {
  name: "MainPage",

  data() {
    return {
      focus: false,
      zcode: zcode,
    };
  },

  methods: {
    locationSelect(code) {
      this.$router.push({ name: "MainPage", query: { zcode: `${code}` } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/_variables.scss";

section {
  position: relative;
  height: 100%;
}
.search-section {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: 0.4s;
  width: 80%;
  &.focus {
    top: 0%;
    transform: translate(-50%, 0);
  }
}

h1 {
  margin-bottom: rem(20);
  font-size: 70px;
  font-weight: 700;
}
.search-box {
  padding: rem(20) rem(30);
  border-radius: 50px;
  border: 1px solid $primary;
  @include flex;
  font-size: rem(30);
  box-shadow: 1px 1px 6px rgba($color: $black, $alpha: 0.16);
  input {
    width: 70%;
    font-size: rem(36);
    font-weight: 600;
    color: $black;
    &::placeholder {
      font-weight: 500;
      color: $gray;
    }
  }
  span {
    @include flex(center, center);
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid transparent;
    transition: 0.2s;
    &:hover {
      border: 1px solid rgba($color: $primary, $alpha: 0.8);
      box-shadow: 1px 1px 6px rgba($color: $black, $alpha: 0.16);
    }
  }
}

.location-list {
  width: 60%;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  transition: 0.4s;
  &.focus {
    top: 30%;
  }
  ul {
    @include flex(center);
    flex-wrap: wrap;
    gap: 20px;
    li {
      font-weight: 600;
      font-size: rem(24);
      min-width: 240px;
      text-align: center;
      word-break: keep-all;
      border-radius: 5px;
      border: 1px solid $black;
      padding: 20px 30px;
      background: $white;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        transform: scale(1.2);
        box-shadow: 1px 1px 6px rgba($color: $black, $alpha: 0.16);
      }
    }
  }
}
</style>
