import { createSlice } from '@reduxjs/toolkit'
import { IAsignatura } from '../../../app/Models/Iasignatura';

export const asignaturaSlice = createSlice({
  name: 'asignatura',
  initialState: {
    asignaturas: Array<IAsignatura>(),
  },
  reducers: {
    setAsignaturas: (state, action) => {
      console.log(action);
      state.asignaturas = action.payload.asignaturas;
    },
   
  },
})

export const { setAsignaturas } = asignaturaSlice.actions