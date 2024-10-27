import { Iasignatura } from "./Iasignatura";
import { Iintensidad } from "./Iintensidad";

export interface Icontenidos_minimos_plan_estudio {
  contenidoMinimoPlanEstudioId: number;
  nombre: string;
  horasPractica?: number | 0;
  horasTeoria?: number | 0;
  exigencia: "O" | "R";
  asignaturaId: Iasignatura;
  intensidadId: Iintensidad;
}

// {
//   "contenidoMinimoPlanEstudioId": "<integer>",
//   "nombre": "",
//   "horasPractica": "",
//   "horasTeoria": "",
//   "exigencia": "O",
//   "asignaturaId": "",
//   "intensidadId": ""
// }
