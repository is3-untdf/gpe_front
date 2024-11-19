import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getContenidosMinimos } from "../../store/slices/contenidosMinimos/contenidosMinimosThunks";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import { Icontenidos_minimos_plan_estudio } from "../Models/Icontenidos_minimos_plan_estudio";
import { getRecomendacionCurriculares } from "../../store/slices/recomendacionCurricular/recomendacionCurricularThunks";
import { Irecomendacion_curricular } from "../Models/Irecomendacion_curricular";

export const Play = () => {

  //Leer
  const dispatch = useDispatch<AppDispatch>();
  const { contenidosMinimos = [] } = useSelector((state: RootState) => state.contenidosMinimos);
  const { recomendacionCurriculares = [] } = useSelector((state: RootState) => state.recomendacionCurricular);
  useEffect(() => {
    if (contenidosMinimos.length === 0) { dispatch(getContenidosMinimos()); }
    if (recomendacionCurriculares.length === 0) { dispatch(getRecomendacionCurriculares()); }
  }, [dispatch, contenidosMinimos.length, recomendacionCurriculares.length]);

  // Columnas de la tabla Contenidos Mínimos
  const columnsContenidosMinimos: GridColDef[] = [
    { field: 'contenidoMinimoPlanEstudioId', headerName: 'Id', flex: 0.1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
  ];
  const paginationModelContenidosMinimos = { page: 0, pageSize: 5 };
  // Columnas de la tabla Recomendación Curricular
  const columnsRecomendacionCurricular: GridColDef[] = [
    { field: 'recomendacionCurricularId', headerName: 'Id', flex: 0.1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
  ];
  const paginationModelRecomendacionCurricular = { page: 0, pageSize: 5 };

  // Almacenar los Contenidos Minimos seleccionados
  const [contenidosMinimosSelect, setContenidosMinimosSelect] = useState<Icontenidos_minimos_plan_estudio[]>([]);
  const SelectionContenidosMinimos = (selectionModel: GridRowSelectionModel) => {
    const selectedData = contenidosMinimos.filter((row) => selectionModel.includes(row.contenidoMinimoPlanEstudioId));
    setContenidosMinimosSelect(selectedData); // Guarda todos los registros seleccionados en el estado
  };
  useEffect(() => {
    console.log(contenidosMinimosSelect);
  }, [contenidosMinimosSelect])

  // Estado para seleccionar solo una fila de Recomendaciones Curriculares
  const [recomendacionesCurricularesSelect, setRecomenacionesCurricularesSelect] = useState<Irecomendacion_curricular[]>([]);
  const SelectionRecomendacionesCurriculares = (selectionModel: GridRowSelectionModel) => {
    const selectedData = recomendacionCurriculares.filter((row) => selectionModel.includes(row.recomendacionCurricularId));
    setRecomenacionesCurricularesSelect(selectedData);
  };
  useEffect(() => {
    console.log(recomendacionesCurricularesSelect);
  }, [recomendacionesCurricularesSelect]);


  return (
    // <div style={{ paddingLeft: "1%", paddingRight: "1%" }}>
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", width: '81vw', height: '10vh' }}>
        <div style={{ border: "1px solid black" }}>Dashboards</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: '81vw', height: '52vh' }}>
        <div style={{ border: "1px solid black" }}>Recomendaciones Curriculares
          <Paper sx={{ width: "100%", height: "94%" }}>
            <DataGrid
              rows={recomendacionCurriculares}
              columns={columnsRecomendacionCurricular}
              getRowId={(row) => row.recomendacionCurricularId}
              initialState={{ pagination: { paginationModel: paginationModelRecomendacionCurricular } }}
              pageSizeOptions={[5, 10, 50, 100]}
              onRowSelectionModelChange={(newSelectionModel) => SelectionRecomendacionesCurriculares([...newSelectionModel])}
              // rowSelectionModel
              disableColumnResize
              sx={{
                width: '100%',
                height: '100%',
                border: 0,
                '& .MuiDataGrid-virtualScroller': { overflow: 'auto' }
              }}
            />
          </Paper>
        </div>
        <div style={{ border: "1px solid black" }}>Contenidos Mínimos
          <Paper sx={{ width: "100%", height: "94%" }}>
            <DataGrid
              rows={contenidosMinimos}
              columns={columnsContenidosMinimos}
              getRowId={(row) => row.contenidoMinimoPlanEstudioId}
              initialState={{ pagination: { paginationModel: paginationModelContenidosMinimos } }}
              pageSizeOptions={[5, 10, 50, 100]}
              checkboxSelection
              onRowSelectionModelChange={(newSelectionModel) => SelectionContenidosMinimos([...newSelectionModel])}
              disableColumnResize
              sx={{
                width: '100%',
                height: '100%',
                border: 0,
                '& .MuiDataGrid-virtualScroller': { overflow: 'auto' }
              }}
            />
          </Paper>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", width: '81vw', height: '50vh' }}>
        <div style={{ border: "1px solid black" }}>Aplicaciones</div>
      </div>
    </div>
  );
};
