import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Icontenidos_minimos_plan_estudio } from "../Models/Icontenidos_minimos_plan_estudio";
import { getContenidosMinimos } from "../../store/slices/contenidosMinimos/contenidosMinimosThunks";
import { getRecomendacionCurriculares } from "../../store/slices/recomendacionCurricular/recomendacionCurricularThunks";
import { getIntensidades } from "../../store/slices/intensidad/intensidadThunks";
import { Irecomendacion_curricular } from "../Models/Irecomendacion_curricular";
import { DialogActions, Fab, Tooltip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteRecomendacionCurricularesXContenidosMinimos,
  getRecomendacionCurricularesXContenidosMinimosByContenidosMinimos,
  getRecomendacionCurricularesXContenidosMinimosByRecomendacionesCurriculares,
} from "../../store/slices/recomendacionCurricularXContenidosMinimos/recomendacionCurricularXContenidosMinimosThunks";
import { PlayForm } from "../Components/PlayForm";
import { Irecomendacion_curricular_x_contenido_minimo_plan_estudio } from "../Models/Irecomendacion_curricular_x_contenido_minimo_plan_estudio";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";
import { HorizontalBarChart } from "../../assets/HorizontalBarChart";

export const Play = () => {
  //Leer
  const dispatch = useDispatch<AppDispatch>();
  const { contenidosMinimos = [] } = useSelector(
    (state: RootState) => state.contenidosMinimos
  );
  const { recomendacionCurriculares = [] } = useSelector(
    (state: RootState) => state.recomendacionCurricular
  );
  const { intensidades = [] } = useSelector(
    (state: RootState) => state.intensidades
  );
  const { recomendacionCurricularesXContenidosMinimos = [] } = useSelector(
    (state: RootState) => state.recomendacionCurricularXContenidosMinimos
  );

  useEffect(() => {
    if (contenidosMinimos.length === 0) {
      dispatch(getContenidosMinimos());
    }
    if (recomendacionCurriculares.length === 0) {
      dispatch(getRecomendacionCurriculares());
    }
    if (intensidades.length === 0) {
      dispatch(getIntensidades());
    }
  }, [
    dispatch,
    contenidosMinimos.length,
    recomendacionCurriculares.length,
    intensidades.length,
  ]);

  // Columnas de la tabla Contenidos Mínimos
  const columnsContenidosMinimos: GridColDef[] = [
    { field: "contenidoMinimoPlanEstudioId", headerName: "Id", flex: 0.1 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
  ];
  const paginationModelContenidosMinimos = { page: 0, pageSize: 5 };

  // Columnas de la tabla Recomendación Curricular
  const columnsRecomendacionCurricular: GridColDef[] = [
    { field: "recomendacionCurricularId", headerName: "Id", flex: 0.1 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
  ];
  const paginationModelRecomendacionCurricular = { page: 0, pageSize: 5 };

  // Columnas de la tabla Recomendación Curricular x Contenidos Mínimos
  const columnsRecomendacionCurricularXContenidosMinimos: GridColDef[] = [
    { field: "recomendacionCurricularId", headerName: "IdRC", flex: 0.1 },
    { field: "contenidoMinimoPlanEstudioId", headerName: "IdCM", flex: 0.1 },
    { field: "horasPractica", headerName: "Hs Práctica", flex: 0.2 },
    { field: "horasTeoria", headerName: "Hs Teoría", flex: 0.2 },
    { field: "exigencia", headerName: "Exigencia", flex: 0.1 },
    { field: "intensidadId", headerName: "Intensidad", flex: 0.1 },
    { field: "observaciones", headerName: "Observaciones", flex: 0.5 },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.3,
      renderCell: (params) => (
        <>
          {/* Botón Editar */}
          <Tooltip title="Editar">
            <Fab
              color="secondary"
              size="small"
              style={{ marginRight: "20px" }}
              onClick={() => handleEdit(params.row)}
            >
              <Edit />
            </Fab>
          </Tooltip>
          {/* <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => handleEdit(params.row)}
          >
            Editar
          </Button> */}

          {/* Botón Eliminar */}
          <Tooltip title="Eliminar">
            <Fab
              color="error"
              size="small"
              onClick={() => {
                setDeleteId(
                  params.row
                    .recomendacionCurricularXContenidoMinimoPlanEstudioId
                );
                setOpenDialog(true);
              }}
            >
              <Delete />
            </Fab>
          </Tooltip>
          {/* <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() =>
              handleDelete(
                params.row.recomendacionCurricularXContenidoMinimoPlanEstudioId
              )
            }
          >
            Eliminar
          </Button> */}
        </>
      ),
    },
  ];
  const paginationModelRecomendacionCurricularXContenidosMinimos = {
    page: 0,
    pageSize: 5,
  };

  //Editar
  const handleEdit = (
    row: Irecomendacion_curricular_x_contenido_minimo_plan_estudio
  ) => {
    setEditState(row);
    setModalAbrir(true);
  };

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deleteRecomendacionCurricularesXContenidosMinimos(deleteId));
    }
    setDeleteId(null);
    setOpenDialog(false);
    toast.success("Elemento eliminado exitosamente");
  };

  // Estado para seleccionar solo una fila de Recomendaciones Curriculares
  const [
    recomendacionesCurricularesSelect,
    setRecomenacionesCurricularesSelect,
  ] = useState<Irecomendacion_curricular[]>([]);
  const SelectionRecomendacionesCurriculares = (
    selectionModel: GridRowSelectionModel
  ) => {
    const selectedData = recomendacionCurriculares.filter((row) =>
      selectionModel.includes(row.recomendacionCurricularId)
    );
    setRecomenacionesCurricularesSelect(selectedData);
    //Buscar RCxCM por RC
    dispatch(
      getRecomendacionCurricularesXContenidosMinimosByRecomendacionesCurriculares(
        selectedData[0].recomendacionCurricularId
      )
    );
  };

  // Estado para seleccionar solo una fila de Contenidos Mínimos
  const [contenidosMinimosSelect, setContenidosMinimosSelect] = useState<
    Icontenidos_minimos_plan_estudio[]
  >([]);
  const SelectionContenidosMinimos = (
    selectionModel: GridRowSelectionModel
  ) => {
    const selectedData = contenidosMinimos.filter((row) =>
      selectionModel.includes(row.contenidoMinimoPlanEstudioId)
    );
    setContenidosMinimosSelect(selectedData);
    //Buscar RCxCM por CM
    dispatch(
      getRecomendacionCurricularesXContenidosMinimosByContenidosMinimos(
        selectedData[0].contenidoMinimoPlanEstudioId
      )
    );
    //Calcular grafico
    calcularGrafico();
  };

  //Calcular grafico
  const [totalPracticoGrafico, setTotalPracticoGrafico] = useState<number>(0);
  const [totalTeoricoGrafico, setTotalTeoricoGrafico] = useState<number>(0);
  const calcularGrafico = () => {
    const TotalPracticoGrafico =
      recomendacionCurricularesXContenidosMinimos.reduce(
        (suma, PRC) => suma + PRC.horasPractica,
        0
      );
    const TotalTeoricoGrafico =
      recomendacionCurricularesXContenidosMinimos.reduce(
        (suma, TRC) => suma + TRC.horasTeoria,
        0
      );
    setTotalPracticoGrafico(TotalPracticoGrafico);
    setTotalTeoricoGrafico(TotalTeoricoGrafico);
  };

  // Agregar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] =
    useState<Irecomendacion_curricular_x_contenido_minimo_plan_estudio | null>(
      null
    );
  const agregar = () => {
    if (recomendacionesCurricularesSelect.length == 0) {
      toast.error("Seleccione una Recomendación Curricular");
      return;
    }
    if (contenidosMinimosSelect.length == 0) {
      toast.error("Seleccione un Contenido Mínimo");
      return;
    }
    //Se pueden agregar!!!!!!!!!!!!!
    setModalAbrir(true);
    setEditState(null);
  };

  return (
    // <div style={{ paddingLeft: "1%", paddingRight: "1%" }}>
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "81vw",
          height: "10vh",
        }}
      >
        {/* <h2 style={{ textAlign: "left" }}>Dashboard</h2> */}
        {/* <div style={{ border: "1px solid black" }}>Dashboards</div> */}
        {totalTeoricoGrafico > 0 && totalPracticoGrafico > 0 && (
          <HorizontalBarChart
            total={totalTeoricoGrafico}
            completed={totalPracticoGrafico}
          />
        )}

        <div style={{ textAlign: "end", paddingRight: "1%", paddingTop: "1%" }}>
          <DialogActions>
            <Tooltip title="Agregar" aria-label="add">
              <Fab color="primary" onClick={() => agregar()}>
                <Add />
              </Fab>
            </Tooltip>
            <ToastContainer />
          </DialogActions>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "81vw",
          height: "52vh",
        }}
      >
        <div style={{ border: "1px solid black" }}>
          Recomendaciones Curriculares
          <Paper sx={{ width: "100%", height: "94%" }}>
            <DataGrid
              rows={recomendacionCurriculares}
              columns={columnsRecomendacionCurricular}
              getRowId={(row) => row.recomendacionCurricularId}
              initialState={{
                pagination: {
                  paginationModel: paginationModelRecomendacionCurricular,
                },
              }}
              pageSizeOptions={[5, 10, 50, 100]}
              onRowSelectionModelChange={(newSelectionModel) =>
                SelectionRecomendacionesCurriculares([...newSelectionModel])
              }
              // rowSelectionModel
              disableColumnResize
              sx={{
                width: "100%",
                height: "100%",
                border: 0,
                "& .MuiDataGrid-virtualScroller": { overflow: "auto" },
              }}
            />
          </Paper>
        </div>
        <div style={{ border: "1px solid black" }}>
          Contenidos Mínimos
          <Paper sx={{ width: "100%", height: "94%" }}>
            <DataGrid
              rows={contenidosMinimos}
              columns={columnsContenidosMinimos}
              getRowId={(row) => row.contenidoMinimoPlanEstudioId}
              initialState={{
                pagination: {
                  paginationModel: paginationModelContenidosMinimos,
                },
              }}
              pageSizeOptions={[5, 10, 50, 100]}
              // checkboxSelection
              onRowSelectionModelChange={(newSelectionModel) =>
                SelectionContenidosMinimos([...newSelectionModel])
              }
              disableColumnResize
              sx={{
                width: "100%",
                height: "100%",
                border: 0,
                "& .MuiDataGrid-virtualScroller": { overflow: "auto" },
              }}
            />
          </Paper>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "81vw",
          height: "50vh",
        }}
      >
        <div style={{ border: "1px solid black" }}>
          Recomendaciones Curriculares x Contenidos Mínimos
          <Paper sx={{ width: "100%", height: "94%" }}>
            <DataGrid
              rows={recomendacionCurricularesXContenidosMinimos}
              columns={columnsRecomendacionCurricularXContenidosMinimos}
              getRowId={(row) =>
                row.recomendacionCurricularXContenidoMinimoPlanEstudioId
              }
              initialState={{
                pagination: {
                  paginationModel:
                    paginationModelRecomendacionCurricularXContenidosMinimos,
                },
              }}
              pageSizeOptions={[5, 10, 50, 100, 200]}
              // onRowSelectionModelChange={(newSelectionModel) =>
              // SelectionRecomendacionesCurriculares([...newSelectionModel])
              // }
              // rowSelectionModel
              disableColumnResize
              sx={{
                width: "100%",
                height: "100%",
                border: 0,
                "& .MuiDataGrid-virtualScroller": { overflow: "auto" },
              }}
            />
          </Paper>
        </div>
      </div>
      {/* Modal Eliminar */}
      <AlertDialogEliminar open={openDialog} onClose={handleDialogClose} />
      {/* Modal Agregar/Editar */}
      <PlayForm
        open={modalAbrir}
        onClose={() => (
          dispatch(
            getRecomendacionCurricularesXContenidosMinimosByRecomendacionesCurriculares(
              recomendacionCurriculares[0].recomendacionCurricularId
            )
          ),
          setModalAbrir(false),
          setEditState(null)
        )}
        editState={editState}
        contenidosMinimos={contenidosMinimos}
        recomendacionCurriculares={recomendacionCurriculares}
      />
    </div>
  );
};
