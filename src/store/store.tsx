import { configureStore } from '@reduxjs/toolkit';
import { asignaturaSlice } from './slices/asignatura/asignaturaSlice';
import { planDeEstudioSlice } from './slices/planDeEstudio/planDeEstudioSlice';
import { intensidadSlice } from './slices/intensidad/intensidadSlice';
import { contenidosMinimosSlice } from './slices/contenidosMinimos/contenidosMinimosSlice';
import { recomendacionCurricularSlice } from './slices/recomendacionCurricular/recomendacionCurricularSlice';
import { recomendacionCurricularXContenidosMinimosSlice } from './slices/recomendacionCurricularXContenidosMinimos/recomendacionCurricularXContenidosMinimosSlice';

export const store = configureStore({
  reducer: {
    asignatura: asignaturaSlice.reducer,
    planDeEstudio: planDeEstudioSlice.reducer,
    intensidades: intensidadSlice.reducer,
    contenidosMinimos: contenidosMinimosSlice.reducer,
    recomendacionCurricular: recomendacionCurricularSlice.reducer,
    recomendacionCurricularXContenidosMinimos: recomendacionCurricularXContenidosMinimosSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

