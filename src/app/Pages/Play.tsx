import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getContenidosMinimos } from "../../store/slices/contenidosMinimos/contenidosMinimosThunks";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import { Icontenidos_minimos_plan_estudio } from "../Models/Icontenidos_minimos_plan_estudio";

export const Play = () => {
  
  //Leer
  const dispatch = useDispatch<AppDispatch>();
  const { contenidosMinimos = [] } = useSelector((state: RootState) => state.contenidosMinimos);
  useEffect(() => {
    dispatch(getContenidosMinimos());
  }, [dispatch]);

  // Columnas de la tabla
  const columns: GridColDef[] = [
    { field: 'contenidoMinimoPlanEstudioId', headerName: 'Id' },
    { field: 'nombre', headerName: 'Nombre' },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  // Estado para almacenar el registro seleccionado
  const [contenidosMinimosSelect, setContenidosMinimosSelect] = useState<Icontenidos_minimos_plan_estudio[]>([]);
  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    const selectedData = contenidosMinimos.filter((row) => selectionModel.includes(row.contenidoMinimoPlanEstudioId));
    setContenidosMinimosSelect(selectedData); // Guarda todos los registros seleccionados en el estado
  };

  useEffect(() => {
    console.log(contenidosMinimosSelect);
  }, [contenidosMinimosSelect])
  

  return (
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", width: '80vw', height: '20vh' }}>
        <div style={{ border: "1px solid black" }}>Dashboards</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: '80vw', height: '50vh' }}>
        <div style={{ border: "1px solid black" }}>Recomendaciones Curriculares</div>

        <div style={{ border: "1px solid black" }}>
          Contenidos Mínimos

          <Paper sx={{ width: "100%", height: "86%" }}>
            <DataGrid
              rows={contenidosMinimos}
              columns={columns}
              getRowId={(row) => row.contenidoMinimoPlanEstudioId}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange([...newSelectionModel])}
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr", width: '80vw', height: '40vh' }}>
        <div style={{ border: "1px solid black" }}>Aplicaciones</div>
      </div>
    </div>
  );
};
