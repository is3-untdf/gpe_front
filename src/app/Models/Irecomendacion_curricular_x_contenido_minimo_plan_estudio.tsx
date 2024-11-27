
export interface Irecomendacion_curricular_x_contenido_minimo_plan_estudio {
  recomendacionCurricularXContenidoMinimoPlanEstudioId: number;
  
  recomendacionCurricularId: number; //Id de relación con RC
  contenidoMinimoPlanEstudioId: number; //Id de relación con CM
  intensidadId: number; //Id de relación con I

  horasPractica: number;
  horasTeoria: number;
  exigencia: string;
  observaciones: string;
}
