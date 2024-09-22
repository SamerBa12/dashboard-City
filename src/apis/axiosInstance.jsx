import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;



export const axiosInstance = axios.create({
    baseURL: apiUrl,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        const auth = token ? `Bearer ${token}` : '';

        config.headers['Authorization'] = auth
        return Promise.resolve(config)
    },
    (error) => Promise.reject(error)
)