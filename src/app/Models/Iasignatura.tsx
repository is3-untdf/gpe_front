import { Iplan_estudio } from "./Iplan_estudio";

export interface Iasignatura {
  asignaturaId: number;
  codigo: string;
  nombre: string;
  cargaHoraria: number;
  planEstudioId?: Iplan_estudio | null; //Ya me trae el dato.

  //   /dependencias
}
