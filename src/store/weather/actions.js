let timer = null;
async function getData(cityName, commit) {
    let data = await axios.get(`?q=${cityName}&units=metric`);
    if (!data)
        return Promise.reject(data)
   await commit("cityWeather", data.data)
    return Promise.resolve(data)
}

const actions = {
        async cityWeather(vuexContext) {
            try {
                if (timer)
                    clearInterval(timer)
                else {
                     getData('Madrid', vuexContext.commit)
                     getData('Barcelona', vuexContext.commit)
                    timer = setInterval(async () => {
                        getData('Madrid', vuexContext.commit)
                        getData('Barcelona', vuexContext.commit)
                    }, 50000)
                }

            } catch (e) {
                return Promise.reject(e)
            }

        }
    }
;
export default actions;

