import { Iactividad_profesional_reservada } from "./Iactividad_profesional_reservada";
import { Irecomendacion_curricular } from "./Irecomendacion_curricular";

export interface Iactividad_profesional_reservada_x_recomendacion_curricular {
  id: number;
  actividad_profesional_reservada_id: Iactividad_profesional_reservada; 
  recomendacion_curricular_id: Irecomendacion_curricular;
}
