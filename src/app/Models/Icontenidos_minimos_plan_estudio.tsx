import { Iasignatura } from "./Iasignatura";
import { Iplan_estudio } from "./Iplan_estudio";

export interface Icontenidos_minimos_plan_estudio {
  contenidoMinimoPlanEstudioId: number;
  nombre: string;
  horasPractica?: number | 0;
  horasTeoria?: number | 0;
  exigencia: string;
  //Agregar Plan de Estudio
  planEstudioId: Iplan_estudio|null; //Pega la entidad entera
  // planEstudio?: Iasignatura|null; //Tabla relacionada
  asignaturaId: Iasignatura|null; //Pega la entidad entera
  // asignatura?: Iasignatura|null; //Tabla relacionada
  intensidadId: number|null; //Trae solamente el id
  // intensidad?: Iintensidad|null; //Tabla relacionada
}
