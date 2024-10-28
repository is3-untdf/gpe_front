import { Iasignatura } from "./Iasignatura";
import { Iintensidad } from "./Iintensidad";

export interface Icontenidos_minimos_plan_estudio {
  contenidoMinimoPlanEstudioId: number;
  nombre: string;
  horasPractica?: number | 0;
  horasTeoria?: number | 0;
  exigencia: string;
  asignaturaId: number;
  asignatura?: Iasignatura|null; //Tabla relacionada
  intensidadId: number;
  intensidad?: Iintensidad|null; //Tabla relacionada
}

// {
//   "contenidoMinimoPlanEstudioId": "<integer>",
//   "nombre": "",
//   "horasPractica": "",
//   "horasTeoria": "",
//   "exigencia": "O", //O|R
//   "asignaturaId": "",
//   "intensidadId": ""
// }

