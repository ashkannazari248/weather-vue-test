import axiosModule from 'axios'
const instance = axiosModule.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/weather',
    headers: {
        get: {
            Accept: 'application/json',
        },
    },
});

const apiKey = 'appid=79c06f01f69f3f8a9cb88a7949c4a6d5'
instance.interceptors.request.use((config) => {
    if (!config.url.match('appid=')) {
        if (config.url.match(/\?/g))
            config.url += `&${apiKey}`;
        else
            config.url += `?${apiKey}`;
    }
    return Promise.resolve(config);
}, (err => {
    return Promise.reject(err);
}));

export default instance;
