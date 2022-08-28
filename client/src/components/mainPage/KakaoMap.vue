<template>
  <div id="map"></div>
</template>

<script>
import { zcode } from "@/modules/common";
import { mapMutations, mapState } from "vuex";
// import $ from "jquery";

export default {
  name: "KakaoMap",

  data() {
    return {
      map: null,
      markers: [],
      cluster: null,
    };
  },

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_KEY}&libraries=services&autoload=false`;
      /* global kakao */
      document.head.appendChild(script);
      script.onload = () => {
        kakao.maps.load(() => {
          this.initMap();
        });
      };
    }
  },

  methods: {
    ...mapMutations(["SET_SELECTED_STAT"]),

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          36.358166539433725,
          127.74156336634121
        ),
        level: 6,
      };
      this.map = new kakao.maps.Map(container, options);
      const zcodeName = zcode.filter(
        (item) => item.zcode === Number(this.$route.query.zcode)
      )[0].name;
      this.moveMap(zcodeName, 5);
    },

    // clusterSet() {
    //   //카카오 마커 클러스터 셋팅
    //   this.cluster = new kakao.maps.MarkerClusterer({
    //     map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    //     averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    //     minLevel: 10, // 클러스터 할 최소 지도 레벨
    //     disableClickZoom: false, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    //   });
    // },

    moveMap(addr, level) {
      var geocoder = new kakao.maps.services.Geocoder();
      //쿼리에서 zcode로 common.js에 있는 지역 명을 검색하여 지역 중심으로 지도 이동
      const location = addr;
      geocoder.addressSearch(location, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          this.map.setLevel(level);
          this.map.setCenter(coords);
        }
      });
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

    makeMarker(list) {
      //마커 초기화
      this.markers.forEach((item) => {
        item.setMap(null);
      });
      this.markers = [];
      const redMarker = require(`@/assets/images/marker/marker-red.png`);
      const blueMarker = require(`@/assets/images/marker/marker-blue.png`);
      const tealMarker = require(`@/assets/images/marker/marker-teal.png`);

      const usable = list.filter((item) => this.isUsable(item) === "2");
      console.log(usable);
      const charging = list.filter((item) => this.isUsable(item) === "3");
      const error = list.filter(
        (item) => this.isUsable(item) !== "2" && this.isUsable(item) !== "3"
      );
      this.setMarkers(error, redMarker);
      this.setMarkers(charging, tealMarker);
      this.setMarkers(usable, blueMarker);
      //마커 지도에 그리기
      this.markers.forEach((item) => {
        item.setMap(this.map);
      });
    },

    setMarkers(resultList, img) {
      //마커 만드는 함수
      const size = new kakao.maps.Size(29, 42);
      const location = [];
      //result리스트에서 latlng 데이터 가져오기
      resultList.forEach((item) => {
        let obj = {};
        obj.lat = item[0].lat;
        obj.lng = item[0].lng;
        obj.detail = item;
        location.push(obj);
      });
      //가져온 latlng을 이용해 마커 생성하기
      location.forEach((item) => {
        const marker = new kakao.maps.Marker({
          image: new kakao.maps.MarkerImage(img, size),
          position: new kakao.maps.LatLng(item.lat, item.lng),
        });

        // 클릭 이벤트 추가
        kakao.maps.event.addListener(marker, "click", () => {
          this.SET_SELECTED_STAT(item.detail);
        });
        this.markers.push(marker);
      });
    },
  },
  computed: {
    ...mapState(["searchList", "selectedStat"]),
  },

  watch: {
    searchList: {
      deep: true,
      handler() {
        this.makeMarker(this.searchList);
      },
    },
    selectedStat: {
      deep: true,
      handler() {
        if (this.selectedStat === null) {
          return;
        } else {
          const coords = new kakao.maps.LatLng(
            this.selectedStat[0].lat,
            this.selectedStat[0].lng
          );
          this.map.setLevel(3);
          this.map.setCenter(coords);
        }
      },
    },

    "$route.query.zcode": {
      deep: true,
      handler() {
        const zcodeName = zcode.filter(
          (item) => item.zcode === Number(this.$route.query.zcode)
        )[0].name;
        this.moveMap(zcodeName, 5);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>
