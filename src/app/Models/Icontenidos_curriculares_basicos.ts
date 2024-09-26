import { Itrayecto_formativo } from "./Itrayecto_formativo";

export interface Icontenidos_curriculares_basicos {
  id: number;
  nombre: string;
  trayecto_formativo_id: Itrayecto_formativo;
}
