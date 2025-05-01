import axios from "axios"

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

function getBalance(xlmAddress) {
    return axios.get(`https://horizon.stellar.org/accounts/${xlmAddress}`, { withCredentials: false })
        .then(response => {
            // Find the native asset balance
            const nativeBalance = response.data.balances.find(balance => balance.asset_type === 'native');
            return {
                data: {
                    balances: [nativeBalance || { balance: '0' }]
                }
            };
        })
        .catch(error => {
            console.error('Error fetching balance:', error);
            // Return a default structure with 0 balance if there's an error
            return {
                data: {
                    balances: [{ balance: '0' }]
                }
            };
        });
}

function createSession(tempUUID) {
    return axios.post(
        ENDPOINT_PATH + 'api/auth/session',
        {},
        {
            headers: {
                UUID: tempUUID,
            }
        }
    );
}

function refreshAccessToken() {
    return axios.post(ENDPOINT_PATH + 'api/auth/refresh')
        .then(response => {
            return response.data.accessToken; // Devolver el nuevo access token
        })
        .catch(error => {
            console.error('Error al renovar el access token:', error);
            throw error; // Propagar el error para manejarlo en el componente
        });
}

async function getEcosystemVideosList(page = 0, size = 48) {
    try {
        const response = await axios.get(`https://api.earnlumens.org/api/mock/videos/list/ecosystem`, {
            params: {
                page,
                size    
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching ecosystem videos:", error);
        throw error;
    }
}

async function getCommunityVideosList(page = 0, size = 48) {
    try {
        const response = await axios.get(`https://api.earnlumens.org/api/mock/videos/list/community`, {
            params: {
                page,
                size    
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching community videos:", error);
        throw error;
    }
}

export default {
    subscribe,
    getBalance,
    getWaitlistStats,
    createSession,
    refreshAccessToken,
    getEcosystemVideosList,
    getCommunityVideosList
}