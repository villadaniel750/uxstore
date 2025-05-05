import jwtWorker from '@/webworker/jwtWorkerClient.js';
import { store } from '@/store';
import api from '@/api';

async function createSession(uuid) {
  const res = await api._createSession(uuid);
  const accessToken = res.data.accessToken;
  await jwtWorker.setToken(accessToken);
  store.commit('setLoggedInTrue');
  store.commit('setOfflineFalse');
}

async function logout() {
  try {
    await api._logout();
  } catch (e) {
    console.warn('Logout fail, continue cleanup');
  }
  await jwtWorker.clearToken();
  store.commit('setLoggedInFalse');
  store.commit('setOfflineFalse');
}

async function refreshTokenWithRetry() {
  try {
    const res = await api._refreshToken();
    const accessToken = res.data.accessToken;
    await jwtWorker.setToken(accessToken);
    store.commit('setLoggedInTrue');
    store.commit('setOfflineFalse');
    return accessToken;
  } catch (err) {
    const isNetworkError = !err.response;
    const isUnauthorized = err.response?.status === 401;

    if (isUnauthorized) {
      await logout();
    }

    if (isNetworkError) {
      store.commit('setLoggedInTrue');
      store.commit('setOfflineTrue');
    }

    throw err;
  }
}

async function getValidToken() {
  const token = await jwtWorker.getToken();
  if (token) return token;
  return await refreshTokenWithRetry();
}

export default {
  createSession,
  logout,
  refreshTokenWithRetry,
  getValidToken,
};
