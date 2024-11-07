import { Iplan_estudio } from "./Iplan_estudio";

export interface Iasignatura {
  asignaturaId: number;
  codigo: string;
  nombre: string;
  cargaHoraria: number;
  planEstudioId?: number | 0; //dependencias: trae el dato, si es un getAll trae el numero de Id.
  planEstudio?: Iplan_estudio | null; //dependencias: trae el dato, si es un getAll trae el numero de Id.
}