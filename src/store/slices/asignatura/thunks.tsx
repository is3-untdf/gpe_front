import { Api } from "../../../api/Api";
import type { AppDispatch } from "../../store";
import { setAsignaturas } from "./asignaturaSlice";

export const getAsignaturas = () => {
  return async (dispatch: AppDispatch) => {
    //TODO realizar peticion http
    const { data } = await(Api.get(`/asignaturas`));
    console.log(data);
    dispatch(setAsignaturas({ asignaturas: data}));
  };
};

