import { startLoadingPokemon } from "./pokemonSlice"


export const getPokemons = ( page = 0) => {
    return async( dispatch, getState) => {
        dispatch( startLoadingPokemon());

        //Todo: realizar peticion http
    }
}