<template>
  <section>
    <article class="search-section" :class="{ focus: focus === true }">
      <h1>전기차 충전소 검색</h1>
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
  transition: 0.4s;
  width: 80%;
  margin: 20px auto 70px;
  transform: translateY(30vh);
  &.focus {
    transform: translateY(0);
  }
  @include mobile {
    width: 90%;
    margin: 20px auto 30px;
  }
}

h1 {
  margin-bottom: rem(20);
  font-size: rem(70);
  font-weight: 700;
  @include mobile {
    font-size: 30px;
  }
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
  @include mobile {
    padding: 10px 15px;
    font-size: 16px;
    input {
      font-size: 16px;
    }
  }
}

.location-list {
  margin: 0 auto;
  width: 80%;
  transition: 0.4s;
  transform: translateY(100vh);
  ul {
    @include flex(center);
    flex-wrap: wrap;
    gap: rem(20);
    li {
      font-weight: 600;
      font-size: rem(24);
      min-width: 200px;
      text-align: center;
      word-break: keep-all;
      border-radius: 5px;
      border: 1px solid $black;
      padding: rem(20) rem(30);
      background: $white;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        transform: scale(1.2);
        box-shadow: 1px 1px 6px rgba($color: $black, $alpha: 0.16);
      }
    }
  }
  &.focus {
    transform: translateY(0);
  }
  @include tablet {
    width: 80%;
    ul {
      li {
        min-width: 100px;
      }
    }
  }
  @include mobile {
    width: 90%;
    ul {
      gap: 10px;
      li {
        font-size: 14px;
        min-width: 48%;
      }
    }
  }
}
</style>
