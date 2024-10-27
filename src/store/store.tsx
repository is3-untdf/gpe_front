import { configureStore } from '@reduxjs/toolkit';
import { asignaturaSlice } from './slices/asignatura/asignaturaSlice';
import { planDeEstudioSlice } from './slices/planDeEstudio/planDeEstudioSlice';
import { intensidadSlice } from './slices/intensidad/intensidadSlice';

export const store = configureStore({
  reducer: {
    asignatura: asignaturaSlice.reducer,
    planDeEstudio: planDeEstudioSlice.reducer,
    intensidades: intensidadSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
