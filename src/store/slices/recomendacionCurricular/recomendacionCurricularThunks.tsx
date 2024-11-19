import { Api } from "../../../api/Api";
import type { AppDispatch } from "../../store";
import { setRecomendacionCurriculares } from "./recomendacionCurricularSlice";

//Asignaturas con Dependencias
export const getRecomendacionCurriculares = () => {
  return async (dispatch: AppDispatch) => {
    const { data } = await(Api.get(`/recomendacion-curricular`));
    dispatch(setRecomendacionCurriculares({ recomendacionCurriculares: data}));
  };
};