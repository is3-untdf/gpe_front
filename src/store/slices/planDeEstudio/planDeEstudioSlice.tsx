import { createSlice } from '@reduxjs/toolkit'
import { Iplan_estudio } from '../../../app/Models/Iplan_estudio';

export const planDeEstudioSlice = createSlice({
  name: 'planDeEstudio',
  initialState: {
    planDeEstudios: Array<Iplan_estudio>(),
  },
  reducers: {
    setPlanDeEstudios: (state, action) => {
      state.planDeEstudios = action.payload.planDeEstudios;
    },
  },
})

export const { setPlanDeEstudios } = planDeEstudioSlice.actions


