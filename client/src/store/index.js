import { createStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    chargerData: [],
    searchList: [],
    selectedStat: null,
    cardFlag: false,
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
    },
    SET_CARD_FLAG(state, payload) {
      state.cardFlag = payload;
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
