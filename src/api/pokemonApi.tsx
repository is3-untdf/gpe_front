import axios from 'axios';

export const pokemonApi = axios.create({
    // https://localhost:5001/api/DobHTipoMaquina/getAll
    // baseURL: 'https://pokeapi.co/api/v2'
    // baseURL: 'https://localhost:5001/api'
    baseURL: 'http://localhost:6543'
})
