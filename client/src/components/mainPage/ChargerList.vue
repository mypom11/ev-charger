<template>
  <article>
    <div class="input-box">
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        @focus="SET_CARD_FLAG(true), SET_SELECTED_STAT(null)"
        @keydown.enter="search"
      />
      <button @click="search">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>
    </div>
    <div class="card" :class="{ close: cardFlag === false }">
      <ul class="charger-list">
        <li
          v-for="(list, i) in resultList"
          :key="i"
          @click="selectStat(list)"
          :class="{ active: list === selectedStat }"
        >
          <h3>{{ list[0].statNm }}</h3>
          <span class="kind-detail">{{
            kindDetail[`${list[0].kindDetail}`]
          }}</span>
          <span class="fee-free" v-if="list[0].parkingFee === 'Y'"
            >주차료 무료</span
          >
          <div>
            <p>{{ list[0].useTime }}</p>
            <p :class="`type-${isUsable(list)}`">{{ statCheck(list) }}</p>
          </div>
        </li>
        <li v-if="resultList.length === 0">
          <h3 class="mb-0">조회된 검색 결과가 없습니다.</h3>
        </li>
      </ul>
      <button class="card-toggle" @click="SET_CARD_FLAG(!cardFlag)">
        <font-awesome-icon :icon="['fas', closeIconName]" />
      </button>
      <DetailStat />
    </div>
  </article>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { stat, kindDetail } from "@/modules/common";
import DetailStat from "./DetailStat.vue";

export default {
  name: "ChargerList",
  data() {
    return {
      searchText: null,
      stat: stat,
      kindDetail: kindDetail,
    };
  },
  methods: {
    ...mapMutations([
      "SET_SEARCH_LIST",
      "SET_SELECTED_STAT",
      "SET_CARD_FLAG",
      "SET_MAP_CENTER",
    ]),
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
    selectStat(list) {
      this.SET_SELECTED_STAT(list);
    },
    search($e) {
      //렉을 방지 하기 위해 v-model제거하고 검색 함수로 사용
      this.searchText = $e.target.value;
    },
  },
  computed: {
    ...mapState(["chargerData", "selectedStat", "cardFlag"]),

    resultList: function () {
      //검색 조건으로 결과 리스트를 스토어로 커밋 결과 리스트를 kakaoMap에서 컨트롤 가능
      //computed에 넣음으로써 한글자 한글자 바뀔때마다 리스트가 바뀜.

      //데이터가 많을 경우 렉이 걸려 엔터를 치거나 검색 클릭으로 방식 변경
      let result;
      if (this.searchText === null || this.searchText === "") {
        result = this.chargerData.filter(
          (item) => item[0].zcode === this.$route.query.zcode
        );
      } else {
        result = this.chargerData.filter(
          (item) =>
            item[0].statNm.includes(this.searchText) ||
            item[0].addr.includes(this.searchText)
        );
      }
      //사용가능 순으로 정렬
      function usable(list) {
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
      result.sort(function (a, b) {
        return Number(usable(a)) - Number(usable(b));
      });
      this.SET_SEARCH_LIST(result);
      //검색결과 주변으로 이동
      if (result.length !== 0) {
        this.SET_MAP_CENTER(result[0]);
      }
      return result;
    },

    closeIconName: function () {
      if (this.cardFlag) {
        return "caret-left";
      } else {
        return "caret-right";
      }
    },
  },
  watch: {
    selectedStat: {
      deep: true,
      handler() {
        if (this.selectedStat === null) {
          return;
        } else {
          this.SET_CARD_FLAG(true);
        }
      },
    },
  },
  components: { DetailStat },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/_variables.scss";
.input-box {
  border: 1px solid $primary;
  border-radius: 50px;
  padding: 0 20px;
  position: absolute;
  margin-bottom: 40px;
  top: 30px;
  left: 30px;
  z-index: 50;
  width: 450px;
  background: $white;
  overflow: hidden;
  input {
    width: 100%;
    height: 50px;
    font-size: rem(18);
  }
  button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    background: transparent;
    font-size: rem(18);
    cursor: pointer;
  }
  @include tablet {
    top: 20px;
    left: 10px;
    width: 320px;
    padding: 0 10px;
    input {
      height: 38px;
    }
    button {
      right: 10px;
    }
  }
  @include mobile {
    width: calc(100% - 70px);
    left: 60px;
    top: 20px;
  }
}
.card {
  padding: 20px;
  position: absolute;
  width: 500px;
  height: 98%;
  background: $white;
  left: 10px;
  top: 10px;
  z-index: 10;
  border-radius: $border-radius;
  box-shadow: 1px 1px 6px rgba($color: $black, $alpha: 0.16);
  transition: 0.2s;
  .card-toggle {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(100%, -50%);
    height: 100px;
    cursor: pointer;
    padding: 0 8px;
    border-radius: 0 $border-radius $border-radius 0;
    background: $primary;
    color: $white;
    font-size: 30px;
  }
  &.close {
    left: 0;
    transform: translateX(-100%);
  }
  @include tablet {
    width: 340px;
    padding: 10px;
    top: 0;
    left: 0;
    height: 100%;
  }
  @include mobile {
    left: 0;
    top: auto;
    bottom: 0;
    height: 60vh;
    width: 100%;
    &.close {
      transform: translateY(100%);
    }
    .card-toggle {
      top: 0;
      right: auto;
      left: 50%;
      transform: translate(-50%, -100%);
      height: auto;
      width: 100px;
      font-size: 14px;
      border-radius: 5px 5px 0 0;
      svg {
        transform: rotate(-90deg);
      }
    }
  }
}

.charger-list {
  margin-top: 70px;
  height: calc(100% - 100px);
  overflow-y: auto;
  > li {
    padding: 10px;
    margin-bottom: 20px;
    border-radius: $border-radius;
    border: 1px solid $secondary;
    position: relative;
    cursor: pointer;
    &:hover,
    &.active {
      background: $primary;
      box-shadow: 1px 1px 6px rgba($color: $black, $alpha: 0.16);
      p:nth-of-type(1) {
        color: $white;
      }
      .kind-detail {
        color: $white;
      }
    }
    h3 {
      font-size: rem(20);
      font-weight: 700;
      margin-bottom: 10px;
      max-width: 60%;
    }
    .kind-detail {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .fee-free {
      position: absolute;
      top: -10px;
      left: 0;
      background: $green;
      border-radius: $border-radius;
      font-weight: 700;
      color: $white;
      padding: 2px 5px;
    }
    > div {
      @include flex;
      p:nth-of-type(1) {
        color: $gray;
        font-size: rem(14);
      }
      p {
        @mixin type($color, $type) {
          &.type-#{$type} {
            word-break: keep-all;
            min-width: 40%;
            text-align: right;
            color: $color;
            font-weight: 600;
            font-size: 14px;
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
    &:last-child {
      margin-bottom: 0;
    }
  }
  @include mobile {
    margin-top: 20px;
    height: calc(100% - 20px);
  }
}
</style>
