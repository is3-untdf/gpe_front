import { Icontenidos_minimos_plan_estudio } from "./Icontenidos_minimos_plan_estudio";
import { Irecomendacion_curricular } from "./Irecomendacion_curricular";

export interface Irecomendacion_curricular_x_contenido_minimo_plan_estudio {
  recomendacionCurricularXContenidoMinimoPlanEstudioId: number;
  recomendacionCurricularId: Irecomendacion_curricular;
  contenidoMinimoPlanEstudioId: Icontenidos_minimos_plan_estudio;
  horasPractica: number;
  horasTeoria: number;
  exigencia: string;
  intensidadId: number;
  observaciones: string;
}
