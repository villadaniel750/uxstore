import axios from "axios"
import Cookies from "js-cookie";

//const ENDPOINT_PATH = "https://api.earnlumens.org/run-environment/api/";

axios.defaults.withCredentials = true

//only for dev
var hostname = window.location.hostname;
var ENDPOINT_PATH = "";

if (hostname === "www.earnlumens.org" || hostname === "earnlumens.org") {
    ENDPOINT_PATH = "https://api.earnlumens.org/";
} else {
    ENDPOINT_PATH = "http://localhost:852/";
}
///only for dev

function getWaitlistStats() {
    return axios.get(ENDPOINT_PATH + "api/waitlist/stats")
        .then(response => {
            return response.data.stats; // Devolver solo los datos de estadísticas
        })
        .catch(error => {
            throw error; // Manejar el error adecuadamente en tu aplicación
        });
}

function subscribe(email, feedback, captchaResponse) {
    return axios.post(ENDPOINT_PATH + 'api/waitlist/subscribe', { email, feedback, captchaResponse })
}

function signup(username, password, captchaResponse) {
    return axios.post(ENDPOINT_PATH + 'api/auth/signup', { username, password, captchaResponse })
}

function verify(username, codex, captchaResponse) {
    return axios.post(ENDPOINT_PATH + 'api/auth/verify', { username, codex, captchaResponse })
}

function authenticate(username, password) {
    return axios.post(ENDPOINT_PATH + 'api/auth/signin', { username, password })
}

function getBalance(xlmAddress) {
    return axios.get("https://horizon-testnet.stellar.org/accounts/" + xlmAddress, { withCredentials: false })
}

function getServerBalance(JWTToken) {
    return axios.get(ENDPOINT_PATH + "api/test/balance", { headers: { "Authorization": `Bearer ${JWTToken}` } })
}

function setUserLogged(userLogged) {
    Cookies.set("UAT", userLogged)
}

function getUserLogged() {
    return Cookies.get("UAT")
}

function deleteUserLogged() {
    Cookies.remove('UAT');
    window.localStorage.removeItem('PUK');
}

function sendCookieHttpOnly(JWTToken) {
    console.log(JWTToken)
    return axios.get(ENDPOINT_PATH + 'api/test/cookies', { headers: { "Authorization": `Bearer ${JWTToken}` } })
}

function requestSep10Challenge(publicKey) {
    return axios.get(`https://api.earnlumens.org/auth?account=${publicKey}`)
        .then(response => response.data) // Devuelve el XDR del desafío
        .catch(error => {
            console.error("Error solicitando el desafío SEP-10:", error);
            throw error;
        });
}

function submitSignedTransaction(signedXdr) {
    return axios.post("https://api.earnlumens.org/auth", { transaction: signedXdr })
        .then(response => response.data) // Recibe el JWT si la autenticación fue exitosa
        .catch(error => {
            console.error("Error enviando la transacción firmada:", error);
            throw error;
        });
}

function processXLogin(code, codeVerifier, redirectUri) {
    return axios.post(ENDPOINT_PATH + "auth/x/processXLogin", { code, codeVerifier, redirectUri });
  }

export default {
    subscribe,
    signup,
    verify,
    authenticate,
    getBalance,
    getServerBalance,
    setUserLogged,
    getUserLogged,
    deleteUserLogged,
    sendCookieHttpOnly,
    getWaitlistStats,
    requestSep10Challenge,
    submitSignedTransaction,
    processXLogin
}