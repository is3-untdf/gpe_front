import { createSlice } from '@reduxjs/toolkit'
import { Iasignatura } from '../../../app/Models/Iasignatura';

export const asignaturaSlice = createSlice({
  name: 'asignatura',
  initialState: {
    asignaturas: Array<Iasignatura>(),
  },
  reducers: {
    setAsignaturas: (state, action) => {
      state.asignaturas = action.payload.asignaturas;
    },
  },
})

export const { setAsignaturas } = asignaturaSlice.actions
