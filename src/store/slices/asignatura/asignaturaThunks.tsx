import { Api } from "../../../api/Api";
import { Iasignatura } from "../../../app/Models/Iasignatura";
import type { AppDispatch } from "../../store";
import { setAsignaturas } from "./asignaturaSlice";

//Asignaturas con Dependencias
export const getAsignaturasDependencias = () => {
  return async (dispatch: AppDispatch) => {
    const { data } = await(Api.get(`/asignaturas/dependencias`));
    dispatch(setAsignaturas({ asignaturas: data}));
  };
};
//Asignaturas sin Dependencias
export const getAsignaturas = () => {
  return async (dispatch: AppDispatch) => {
    const { data } = await(Api.get(`/asignaturas`));
    dispatch(setAsignaturas({ asignaturas: data}));
  };
};
export const putAsignatura = (data: Iasignatura) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/asignaturas/${data.asignaturaId}`, data);
      dispatch(getAsignaturasDependencias()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};
export const postAsignatura = (data: Iasignatura) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post('/asignaturas', data);
      dispatch(getAsignaturasDependencias()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

export const deleteAsignatura = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/asignaturas/${data}`);
      dispatch(getAsignaturasDependencias()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};

