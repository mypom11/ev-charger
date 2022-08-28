<template>
  <section>
    <article>
      <ChargerList />
    </article>
    <article class="map">
      <KakaoMap />
    </article>
    <article class="location">
      <LocationList />
    </article>
    <LoadingModal v-if="loadingFlag" />
  </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getCharger } from "@/api/publicData";

import { zcode, groupBy } from "@/modules/common";
import KakaoMap from "@/components/mainPage/KakaoMap.vue";
import ChargerList from "../components/mainPage/ChargerList.vue";
import LocationList from "@/components/mainPage/locationList.vue";
import LoadingModal from "@/components/common/LoadingModal.vue";

export default {
  name: "MainPage",

  components: { KakaoMap, ChargerList, LocationList, LoadingModal },

  created() {
    this.GET_CHARGER_DATA();
  },

  data() {
    return {
      zcode: zcode,
      loadingFlag: false,
    };
  },
  methods: {
    ...mapMutations(["SET_CARD_FLAG"]),

    async GET_CHARGER_DATA() {
      this.loadingFlag = true;
      this.SET_CARD_FLAG(false);
      const num = 8000;
      const chargerData = await getCharger({
        pageNo: 1,
        numOfRows: num,
        zcode: this.$route.query.zcode,
      })
        .then((res) => {
          console.log(res);
          this.loadingFlag = false;
          this.SET_CARD_FLAG(true);
          return res.data.items.item;
        })
        .catch(() => {
          this.loadingFlag = false;
          alert("서버와 통신에 실패했습니다.");
        });
      this.makeResult(chargerData);
    },

    makeResult(chargerData) {
      let resultList = [];
      const grouped = groupBy(chargerData, "statId");
      const result = Object.keys(grouped);
      result.forEach((item) => {
        resultList.push(grouped[item]);
      });
      this.$store.commit("SET_CHARGER_DATA", resultList);
    },
  },
  computed: {
    ...mapState(["chargerData"]),
  },

  watch: {
    "$route.query.zcode": {
      deep: true,
      handler() {
        this.GET_CHARGER_DATA();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/_variables.scss";
</style>
