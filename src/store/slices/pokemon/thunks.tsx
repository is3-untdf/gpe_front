import { Api } from "../../../api/Api";
import type { AppDispatch /*RootState*/ } from "../../store";
import { setPokemons, startLoadingPokemons } from "./pokemonSlice";

export const getPokemons = (page = 0) => {
  return async (dispatch: AppDispatch /*getState: RootState*/) => {
    dispatch(startLoadingPokemons());

    //TODO realizar peticion http
    // https://localhost:5001/api/DobHTipoMaquina/getAll
    const { data } = await(Api.get(`/asignaturas`));
    console.log(data);

    
    dispatch(setPokemons({ pokemons: data, page}));
  };
};

