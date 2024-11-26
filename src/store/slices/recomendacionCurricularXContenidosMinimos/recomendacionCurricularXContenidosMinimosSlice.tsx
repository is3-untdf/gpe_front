import { createSlice } from "@reduxjs/toolkit";
import { Irecomendacion_curricular_x_contenido_minimo_plan_estudio } from "../../../app/Models/Irecomendacion_curricular_x_contenido_minimo_plan_estudio";

export const recomendacionCurricularXContenidosMinimosSlice = createSlice({
  name: 'recomendacionCurricularXContenidosMinimos',
  initialState: {
    recomendacionCurricularesXContenidosMinimos: Array<Irecomendacion_curricular_x_contenido_minimo_plan_estudio>(),
  },
  reducers: {
    setRecomendacionCurricularesXContenidosMinimos: (state, action) => {
      state.recomendacionCurricularesXContenidosMinimos = action.payload.recomendacionCurricularesXContenidosMinimos;
    },
  },
})

export const { setRecomendacionCurricularesXContenidosMinimos } = recomendacionCurricularXContenidosMinimosSlice.actions
