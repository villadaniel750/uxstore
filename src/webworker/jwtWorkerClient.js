// Client to communicate with the worker from the app.
const jwtWorker = new Worker(new URL('./jwtStorage.worker.js', import.meta.url), {
    type: 'module',
  });
  
  /**
   * Store the JWT in the worker.
   * @param {string} token 
   */
  function setToken(token) {
    jwtWorker.postMessage({ action: 'set', data: token });
  }
  
  /**
   * Retrieve the JWT from the worker.
   * @returns {Promise<string|null>}
   */
  function getToken() {
    return new Promise((resolve) => {
      const handler = (e) => {
        if (e.data.action === 'get') {
          jwtWorker.removeEventListener('message', handler);
          resolve(e.data.token);
        }
      };
      jwtWorker.addEventListener('message', handler);
      jwtWorker.postMessage({ action: 'get' });
    });
  }
  
  /**
   * Clear the JWT stored in the worker.
   */
  function clearToken() {
    jwtWorker.postMessage({ action: 'clear' });
  }
  
  export default {
    setToken,
    getToken,
    clearToken,
  };
  