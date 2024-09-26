import { Itrayecto_formativo } from "./Itrayecto_formativo";

export interface Iarea_red_unci {
  id: number;
  sigla: string;
  nombre: string;
  trayecto_formativo_id: Itrayecto_formativo;
}
