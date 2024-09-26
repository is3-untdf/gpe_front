import { IAsignatura } from "./Iasignatura";
import { Iexigencia } from "./Iexigencia";
import { Iintensidad } from "./Iintensidad";

export interface Icontenidos_minimos_plan_estudio {
  id: number;
  nombre: string;
  asignatura_id: IAsignatura;
  horas_practica?: number | 0;
  horas_teoria?: number | 0;
  exigencia_id: Iexigencia;
  intensidad_id: Iintensidad;
}
