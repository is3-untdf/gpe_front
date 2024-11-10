import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getContenidosMinimos } from "../../store/slices/contenidosMinimos/contenidosMinimosThunks";
import { useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";

export const Play = () => {

  // Leer datos
  const dispatch = useDispatch<AppDispatch>();
  const { contenidosMinimos = [] } = useSelector((state: RootState) => state.contenidosMinimos);

  useEffect(() => {
    dispatch(getContenidosMinimos());
  }, [dispatch]);

  //Paginación
  const columns: GridColDef[] = [
    { field: 'contenidoMinimoPlanEstudioId', headerName: 'Id' },
    { field: 'nombre', headerName: 'Nombre' },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", width: '80vw', height: '20vh' }}>
        {/* Dashboards */}
        <div style={{ border: "1px solid black" }}>Dashboards</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: '80vw', height: '50vh' }}>
        {/* Recomendaciones Curriculares */}
        <div style={{ border: "1px solid black" }}>Recomendaciones Curriculares</div>

        {/* Contenidos Mínimos */}
        <div style={{ border: "1px solid black" }}>
          Contenidos Mínimos

          <Paper sx={{ width: 600, height: 400 }}> {/* Configura un tamaño fijo */}
            <DataGrid
              rows={contenidosMinimos}
              columns={columns}
              getRowId={(row) => row.contenidoMinimoPlanEstudioId}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
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

      {/* ASOCIACION */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", width: '80vw', height: '40vh' }}>
        <div style={{ border: "1px solid black" }}>Aplicaciones</div>
      </div>
    </div>
  );
};
