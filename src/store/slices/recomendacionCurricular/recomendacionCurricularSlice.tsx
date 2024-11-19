import { createSlice } from '@reduxjs/toolkit'
import { Irecomendacion_curricular } from '../../../app/Models/Irecomendacion_curricular';

export const recomendacionCurricularSlice = createSlice({
  name: 'recomendacionCurricular',
  initialState: {
    recomendacionCurriculares: Array<Irecomendacion_curricular>(),
  },
  reducers: {
    setRecomendacionCurriculares: (state, action) => {
      state.recomendacionCurriculares = action.payload.recomendacionCurriculares;
    },
  },
})

export const { setRecomendacionCurriculares } = recomendacionCurricularSlice.actions
