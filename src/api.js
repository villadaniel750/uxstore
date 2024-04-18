import axios from "axios"
import Cookies from "js-cookie";

//const ENDPOINT_PATH = "https://api.earnlumens.com/run-environment/api/";

axios.defaults.withCredentials = true

//only for dev
var hostname = window.location.hostname;
var ENDPOINT_PATH = "";

if (hostname === "www.earnlumens.com" || hostname === "earnlumens.com") {
    ENDPOINT_PATH = "https://api.earnlumens.com/run-environment/api/";
} else {
    ENDPOINT_PATH = "http://localhost:852/run-environment/api/";
}
///only for dev

function getWaitlistStats() {
    return axios.get(ENDPOINT_PATH + "waitlist/stats")
        .then(response => {
            return response.data.stats; // Devolver solo los datos de estadísticas
        })
        .catch(error => {
            throw error; // Manejar el error adecuadamente en tu aplicación
        });
}

function subscribe(email, feedback, captchaResponse) {
    return axios.post(ENDPOINT_PATH + 'waitlist/subscribe', { email, feedback, captchaResponse })
}

function signup(username, password, captchaResponse) {
    return axios.post(ENDPOINT_PATH + 'auth/signup', { username, password, captchaResponse })
}

function verify(username, codex, captchaResponse) {
    return axios.post(ENDPOINT_PATH + 'auth/verify', { username, codex, captchaResponse })
}

function authenticate(username, password) {
    return axios.post(ENDPOINT_PATH + 'auth/signin', { username, password })
}

function getBalance(xlmAddress) {
    return axios.get("https://horizon-testnet.stellar.org/accounts/" + xlmAddress, { withCredentials: false })
}

function getServerBalance(JWTToken) {
    return axios.get(ENDPOINT_PATH + "test/balance", { headers: { "Authorization": `Bearer ${JWTToken}` } })
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
    return axios.get(ENDPOINT_PATH + 'test/cookies', { headers: { "Authorization": `Bearer ${JWTToken}` } })
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
    getWaitlistStats
}