import { Api } from "../../../api/Api";
import { Iintensidad } from "../../../app/Models/Iintensidad";
import type { AppDispatch } from "../../store";
import { setIntensidades } from "./intensidadSlice";

export const getIntensidades = () => {
  return async (dispatch: AppDispatch) => {
    const { data } = await(Api.get(`/intensidades`));
    dispatch(setIntensidades({ intensidades: data}));
  };
};
export const putIntensidad = (data: Iintensidad) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/intensidades/${data.intensidadId}`, data);
      dispatch(getIntensidades()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

export const postIntensidad = (data: Iintensidad) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post('/intensidades', data);
      dispatch(getIntensidades()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

export const deleteIntensidad = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/intensidades/${data}`);
      dispatch(getIntensidades()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};

