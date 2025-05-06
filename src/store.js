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
      isOffline: false,
      color: "#FFCA28",
      addr: null,
      lobstrPublicKey: null,
      freighterPublicKey: null,
      accessToken: null,
      loginError: null,
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
    setOfflineTrue(state) {
      state.isOffline = true;
    },
    setOfflineFalse(state) {
      state.isOffline = false;
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
    setFreighterPublicKey(state, publicKey) {
      state.freighterPublicKey = publicKey;
      state.addr = publicKey; // Also update the addr to show the Freighter address
    },
    setAccessToken(state, token) {
      state.accessToken = token;
      state.loggedIn = true; // estado de login
    },
    clearAccessToken(state) {
      state.accessToken = null;
      state.loggedIn = false;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    clearLoginError(state) {
      state.loginError = null;
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
    isOffline: state => state.isOffline,
    isDarkTheme: state => state.isDarkTheme,
    color: state => state.color,
    addr: state => state.addr,
    lobstrPublicKey: state => state.lobstrPublicKey,
    freighterPublicKey: state => state.freighterPublicKey,
    loginError: (state) => state.loginError,
  }
})