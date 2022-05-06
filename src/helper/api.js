import axios from "axios"

const api = () => {
    const { REACT_APP_API_URL } = process.env
    const defaultOptions = {
        baseURL: REACT_APP_API_URL,
        responseType: "json",
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const axiosInstance = axios.create(defaultOptions);

    axiosInstance.interceptors.request.use( config => {
        const localStorageToken = JSON.parse(localStorage.getItem('userToken')); 
        config.headers.Authorization =  localStorageToken ? `Bearer ${localStorageToken.token}` : '';
        return config;
    })

    return axiosInstance;
}

export default api;

