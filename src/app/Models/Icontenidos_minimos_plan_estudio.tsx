import { Iasignatura } from "./Iasignatura";
import { Iintensidad } from "./Iintensidad";
import { Iplan_estudio } from "./Iplan_estudio";

export interface Icontenidos_minimos_plan_estudio {
  contenidoMinimoPlanEstudioId: number;
  nombre?: string | null;
  horasPractica?: number | null;
  horasTeoria?: number | null;
  exigencia?: string | null;
  //Tabla relacionada
  asignaturaId: number; 
  asignatura?: Iasignatura | null; 
  planEstudioId: number;
  planEstudio?: Iplan_estudio | null;
  intensidadId: number;
  intensidad?: Iintensidad | null;
}
