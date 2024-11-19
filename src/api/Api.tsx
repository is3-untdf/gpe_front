import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL

export const Api = axios.create({
    //*******Para Producción */
    // baseURL: apiUrl
        //*******Para Desarrollo */
    baseURL: 'http://localhost:6543'

    // baseURL: '10.7.93.122:6543'
})

