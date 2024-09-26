import { Iactividad_profesional_reservada } from "./Iactividad_profesional_reservada";
import { Ititulo } from "./Ititulo";

export interface Ititulo_x_actividad_profesional_reservada {
  id: number;
  titulo_id: Ititulo;
  actividad_profesional_reservada_id: Iactividad_profesional_reservada;
}
