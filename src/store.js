import { createStore } from 'vuex'
// import lobstr from './store/lobstr'

export const store = createStore({
  // modules: {
  //   lobstr
  // },
  state() {
    return {
      windowWidth: window.innerWidth,
      mobileView: window.innerWidth < 960,
      loggedIn: false,
      isDarkTheme: true,
      color: "#FFCA28",
      addr: null,
      lobstrPublicKey: null,
    }
  },
  mutations: {
    SET_WINDOW_WIDTH(state, width) {
      state.windowWidth = width;
      state.mobileView = state.windowWidth < 960;
    },
    setLoggedInTrue(state) {
      state.loggedIn = true;
    },
    setLoggedInFalse(state) {
      state.loggedIn = false;
    },
    setDarkThemeTrue(state) {
      state.isDarkTheme = true;
    },
    setDarkThemeFalse(state) {
      state.isDarkTheme = false;
    },
    setAddr(state, addr) {
      state.addr = addr;
    },
    clearAddr(state) {
      state.addr = null;
    },
    setLobstrPublicKey(state, publicKey) {
      state.lobstrPublicKey = publicKey;
    },
  },
  actions: {
    updateWindowWidth({ commit }) {
      commit('SET_WINDOW_WIDTH', window.innerWidth);
    }
  },
  getters: {
    windowWidth: state => state.windowWidth,
    mobileView: state => state.mobileView,
    loggedIn: state => state.loggedIn,
    isDarkTheme: state => state.isDarkTheme,
    color: state => state.color,
    addr: state => state.addr,
    lobstrPublicKey: state => state.lobstrPublicKey,
  }
})