<template>
  <transition name="detail">
    <article v-if="selectedStat !== null">
      <div class="stat-info">
        <p class="tag" :class="`type-${isUsable(selectedStat)}`">
          {{ statCheck(selectedStat) }}
        </p>
        <h2>{{ selectedStat[0].statNm }}</h2>
        <p class="addr">{{ selectedStat[0].addr }}</p>
      </div>
      <div class="charger-info">
        <h3>충전기 정보</h3>
        <ul>
          <li
            v-for="(list, i) in selectedStat"
            :key="i"
            :class="`type-${list.stat}`"
          >
            <h4>
              {{ stat[`${list.stat}`] }}
              <span>충전속도 : {{ list.output }}kW</span>
            </h4>
            <p>{{ chargerType[`${list.chgerType}`] }}</p>
          </li>
        </ul>
      </div>
      <span class="close-btn" @click="SET_SELECTED_STAT(null)"
        ><font-awesome-icon :icon="['fas', 'xmark']"
      /></span>
    </article>
  </transition>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { stat, chargerType } from "@/modules/common";

export default {
  name: "DetailStat",
  data() {
    return {
      stat: stat,
      chargerType: chargerType,
    };
  },

  methods: {
    ...mapMutations(["SET_SELECTED_STAT"]),

    statCheck(list) {
      //여러개의 충전소가 있을경우 몇개가 충전가능인지 확인할 수 있게하는 function
      if (list.length === 1) {
        return stat[`${list[0].stat}`];
      } else {
        let usable = 0;
        list.forEach((item) => {
          if (item.stat === "2") {
            usable++;
          }
        });
        return `총 ${list.length}개 중 ${usable}개 사용가능`;
      }
    },

    isUsable(list) {
      //사용가능 여부 확인용
      if (list.length === 1) {
        return `${list[0].stat}`;
      } else {
        let usable = 0;
        list.forEach((item) => {
          if (item.stat === "2") {
            usable++;
          }
        });
        if (usable === 0) {
          return "3";
        } else {
          return "2";
        }
      }
    },
  },

  computed: {
    ...mapState(["selectedStat"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/_variables.scss";

article {
  height: calc(100% - 90px);
  width: calc(100% - 20px);
  position: absolute;
  left: 10px;
  bottom: 0px;
  background: $white;
  box-shadow: 1px 1px 6px rgba($color: $black, $alpha: 0.4);
  border-radius: $border-radius $border-radius 0 0;
  padding: 20px;
}

.stat-info {
  margin-bottom: 40px;

  h2 {
    font-size: rem(32);
    font-weight: 700;
    margin-bottom: 10px;
  }

  .addr {
    font-size: 16px;
    color: $gray;
  }
  .tag {
    @mixin type($color, $type) {
      &.type-#{$type} {
        word-break: keep-all;
        color: $color;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
    @include type($red, 0);
    @include type($red, 1);
    @include type($red, 4);
    @include type($red, 5);
    @include type($green, 2);
    @include type($teal, 3);
    @include type($blue, 9);
  }
}

.charger-info {
  h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  li {
    @include flex(flex-start);
    padding: 15px 10px;
    border-top: 1px solid $light-gray;
    &:last-child {
      border-bottom: 1px solid $light-gray;
    }
    @mixin type($color, $type) {
      &.type-#{$type} {
        color: $color;
      }
    }
    @include type($red, 0);
    @include type($red, 1);
    @include type($red, 4);
    @include type($red, 5);
    @include type($green, 2);
    @include type($teal, 3);
    @include type($blue, 9);
    h4 {
      font-size: 16px;
      font-weight: 500;
      width: 150px;
      span {
        font-size: 14px;
        display: block;
        color: $gray;
        margin-top: 4px;
      }
    }
  }
}

.close-btn {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 30px;
  cursor: pointer;
}

@keyframes detail {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}
.detail-enter-active {
  animation: detail 0.2s;
}
.detail-leave-active {
  animation: detail 0.2s reverse;
}
</style>
