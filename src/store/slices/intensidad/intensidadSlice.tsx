import { createSlice } from '@reduxjs/toolkit'
import { Iintensidad } from '../../../app/Models/Iintensidad';

export const intensidadSlice = createSlice({
  name: 'intensidad',
  initialState: {
    intensidades: Array<Iintensidad>(),
  },
  reducers: {
    setIntensidades: (state, action) => {
      state.intensidades = action.payload.intensidades;
    },
  },
})

export const { setIntensidades } = intensidadSlice.actions
