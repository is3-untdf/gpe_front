import { Api } from "../../../api/Api";
import { Irecomendacion_curricular_x_contenido_minimo_plan_estudio } from "../../../app/Models/Irecomendacion_curricular_x_contenido_minimo_plan_estudio";
import type { AppDispatch } from "../../store";
import { setRecomendacionCurricularesXContenidosMinimos } from "./recomendacionCurricularXContenidosMinimosSlice";

export const getRecomendacionCurricularesXContenidosMinimos = () => {
  return async (dispatch: AppDispatch) => {
    const { data } = await Api.get(`/recomendaciones-curriculares-x-contenidos-minimos-planes-estudio`);
    dispatch(
      setRecomendacionCurricularesXContenidosMinimos({
        recomendacionCurricularesXContenidosMinimos: data,
      })
    );
  };
};

export const getRecomendacionCurricularesXContenidosMinimosByRecomendacionesCurriculares = (id: number) => {
  return async (dispatch: AppDispatch) => {
    const { data } = await Api.get(`/recomendaciones-curriculares-x-contenidos-minimos-planes-estudio/recomendaciones-curriculares/${id}`);
    dispatch(
      setRecomendacionCurricularesXContenidosMinimos({
        recomendacionCurricularesXContenidosMinimos: data,
      })
    );
  };
};

export const getRecomendacionCurricularesXContenidosMinimosByContenidosMinimos = (id: number) => {
  return async (dispatch: AppDispatch) => {
    const { data } = await Api.get(`/recomendaciones-curriculares-x-contenidos-minimos-planes-estudio/contenidos-minimos-planes-estudio/${id}`);
    dispatch(
      setRecomendacionCurricularesXContenidosMinimos({
        recomendacionCurricularesXContenidosMinimos: data,
      })
    );
  };
};

export const putRecomendacionCurricularesXContenidosMinimos = (data: Irecomendacion_curricular_x_contenido_minimo_plan_estudio) => {
  // return async (dispatch: AppDispatch) => {
  return async () => {
    try {
      await Api.put(`/recomendaciones-curriculares-x-contenidos-minimos-planes-estudio/${data.recomendacionCurricularXContenidoMinimoPlanEstudioId}`, data);
      // dispatch(getIntensidades()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put: ", error);
    }
  };
};

export const postRecomendacionCurricularesXContenidosMinimos = (data: Irecomendacion_curricular_x_contenido_minimo_plan_estudio) => {
  // return async (dispatch: AppDispatch) => {
  return async () => {
    try {
      await Api.post('/recomendaciones-curriculares-x-contenidos-minimos-planes-estudio', data);
      // dispatch(getIntensidades()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post: ", error);
    }
  };
};

export const deleteRecomendacionCurricularesXContenidosMinimos = (data: number) => {
  // return async (dispatch: AppDispatch) => {
  return async () => {
    try {
      await Api.delete(`/recomendaciones-curriculares-x-contenidos-minimos-planes-estudio/${data}`);
      // dispatch(getIntensidades()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete: ", error);
    }
  };
};
