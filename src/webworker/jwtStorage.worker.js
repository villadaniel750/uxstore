// Internal logic of the Web Worker: stores, returns, or deletes the JWT.
let token = null;

self.onmessage = function (e) {
  const { action, data } = e.data;

  switch (action) {
    case 'set':
      token = data;
      break;
    case 'get':
      self.postMessage({ action: 'get', token });
      break;
    case 'clear':
      token = null;
      break;
  }
};
