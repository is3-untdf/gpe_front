import { Api } from "../../../api/Api";
import { Icontenidos_minimos_plan_estudio } from "../../../app/Models/Icontenidos_minimos_plan_estudio";
import type { AppDispatch } from "../../store";
import { setContenidosMinimos } from "./contenidosMinimosSlice";

export const getContenidosMinimos = () => {
  return async (dispatch: AppDispatch) => {
    const { data } = await(Api.get(`/contenido-minimos-de-planes-de-estudio`));
    dispatch(setContenidosMinimos({ contenidosMinimos: data}));
  };
};
export const putContenidosMinimos = (data: Icontenidos_minimos_plan_estudio) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/contenido-minimos-de-planes-de-estudio/${data.contenidoMinimoPlanEstudioId}`, data);
      dispatch(getContenidosMinimos()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};
export const postContenidosMinimos = (data: Icontenidos_minimos_plan_estudio) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post('/contenido-minimos-de-planes-de-estudio', data);
      dispatch(getContenidosMinimos()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

export const deleteContenidosMinimos = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/contenido-minimos-de-planes-de-estudio/${data}`);
      dispatch(getContenidosMinimos()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};

