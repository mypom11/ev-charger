import { createStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    chargerData: [],
    searchList: [],
    selectedStat: null,
    cardFlag: false,
    mapCenter: {},
  },
  getters: {},
  mutations: {
    SET_CHARGER_DATA(state, payload) {
      state.chargerData = payload;
    },
    SET_SEARCH_LIST(state, payload) {
      state.searchList = payload;
    },
    SET_SELECTED_STAT(state, payload) {
      state.selectedStat = payload;
      if (payload !== null) {
        state.mapCenter = { lat: payload[0].lat, lng: payload[0].lng };
      }
    },
    SET_CARD_FLAG(state, payload) {
      state.cardFlag = payload;
    },
    SET_MAP_CENTER(state, payload) {
      state.mapCenter = { lat: payload[0].lat, lng: payload[0].lng };
    },
  },
  actions: {},
  modules: {},
  //   plugins: [
  //     createPersistedState({
  //       storage: window.sessionStorage,
  //       paths: ["chargerData"],
  //     }),
  //   ],
});
