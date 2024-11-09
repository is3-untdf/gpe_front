import { Iasignatura } from "./Iasignatura";
import { Iintensidad } from "./Iintensidad";
import { Iplan_estudio } from "./Iplan_estudio";

export interface Icontenidos_minimos_plan_estudio {
  contenidoMinimoPlanEstudioId: number;
  nombre?: string | null;
  horasPractica?: number | null;
  horasTeoria?: number | null;
  exigencia?: string | null;
  
  asignaturaId?: number | null; 
  asignatura?: Iasignatura | null; //Tabla relacionada
  
  planEstudioId?: number | null; //Pega la entidad entera
  planEstudio?: Iplan_estudio | null; //Tabla relacionada
  
  intensidadId?: number | null;
  intensidad?: Iintensidad | null; //Tabla relacionada
}

// {
//   "contenidoMinimoPlanEstudioId": 1,
//   "nombre": "Historia de la Computación. Computación y sociedad",
//   "horasPractica": null,
//   "horasTeoria": null,
//   "exigencia": null,

//   "asignaturaId": 1,
//   "asignatura": {
//       "asignaturaId": 1,
//       "codigo": "IF001",
//       "nombre": "Elementos de Informática",
//       "cargaHoraria": 105,
//       "planEstudioId": {
//           "planEstudioId": 1,
//           "nombre": "Res CS 049-2017"
//       }
//   },
//   "intensidadId": null,
//   "intensidad": null,
//   "planEstudioId": 1,
//   "planEstudio": {
//       "planEstudioId": 1,
//       "nombre": "Res CS 049-2017"
//   }
// },