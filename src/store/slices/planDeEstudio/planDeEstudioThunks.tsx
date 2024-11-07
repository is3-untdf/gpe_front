import { Api } from "../../../api/Api";
import { Iplan_estudio } from "../../../app/Models/Iplan_estudio";
import type { AppDispatch } from "../../store";
import { setPlanDeEstudios } from "./planDeEstudioSlice";

export const getPlanDeEstudios = () => {
  return async (dispatch: AppDispatch) => {
    const { data } = await(Api.get(`/planes-de-estudio`));
    dispatch(setPlanDeEstudios({ planDeEstudios: data}));
  };
};
export const putPlanDeEstudio = (data: Iplan_estudio) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/planes-de-estudio/${data.planEstudioId}`, data);
      dispatch(getPlanDeEstudios()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};
export const postPlanDeEstudio = (data: Iplan_estudio) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post('/planes-de-estudio', data);
      dispatch(getPlanDeEstudios()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

export const deletePlanDeEstudio = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/planes-de-estudio/${data}`);
      dispatch(getPlanDeEstudios()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};

export const clonarPlanDeEstudio = (data: Iplan_estudio) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post('/planes-de-estudio/clonar', data);
      dispatch(getPlanDeEstudios()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};
