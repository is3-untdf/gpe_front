import { createSlice } from '@reduxjs/toolkit'
import { Icontenidos_minimos_plan_estudio } from '../../../app/Models/Icontenidos_minimos_plan_estudio';

export const contenidosMinimosSlice = createSlice({
  name: 'contenidosMinimos',
  initialState: {
    contenidosMinimos: Array<Icontenidos_minimos_plan_estudio>(),
  },
  reducers: {
    setContenidosMinimos: (state, action) => {
      state.contenidosMinimos = action.payload.contenidosMinimos;
    },
  },
})

export const { setContenidosMinimos } = contenidosMinimosSlice.actions
