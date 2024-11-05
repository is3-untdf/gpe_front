import axios from 'axios';

export const Api = axios.create({
    baseURL: 'http://localhost:6543'
    // baseURL: '10.7.93.122:6543'
})

