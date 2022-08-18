export default {
    state: {
        isAuthenticated: false,
        user: null,
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        user(state) {
            return state.user;
        },
    },
    mutations: {
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        setUser(state, payload) {
            console.log('loge In user = ', payload)
            state.user = payload;
        },
    },
    actions: {},
};