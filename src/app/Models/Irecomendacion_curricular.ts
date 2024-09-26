import { Iarea_red_unci } from "./Iarea_red_unci";
import { Iexigencia } from "./Iexigencia";
import { Iintensidad } from "./Iintensidad";
import { Ipeso_relativo } from "./Ipeso_relativo";

export interface Irecomendacion_curricular {
  id: number;
  codigo: number;
  nombre: string;
  exigencia_id: Iexigencia;
  intensidad_id: Iintensidad;
  peso_relativo_id: Ipeso_relativo;
  area_red_unci_id: Iarea_red_unci;
}
