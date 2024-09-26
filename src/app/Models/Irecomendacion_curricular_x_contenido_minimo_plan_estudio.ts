import { Icontenidos_minimos_plan_estudio } from "./Icontenidos_minimos_plan_estudio";
import { Irecomendacion_curricular } from "./Irecomendacion_curricular";

export interface Irecomendacion_curricular_x_contenido_minimo_plan_estudio {
  id: number;
  recomendacion_curricular_id: Irecomendacion_curricular;
  contenidos_minimos_plan_estudio_id: Icontenidos_minimos_plan_estudio;
}
