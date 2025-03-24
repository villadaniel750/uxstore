export default {
    state: {
        publicKey: null
    },
    mutations: {
        setLobstrPublicKey(state, publicKey) {
            state.publicKey = publicKey;
        }
    },
    getters: {
        lobstrPublicKey: state => state.publicKey
    }
}; 