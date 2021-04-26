const mutations = {
    cityWeather(state, payload) {
        if (payload){
            state.cityWeather.push(payload)
        }
    }
};
export default mutations;
