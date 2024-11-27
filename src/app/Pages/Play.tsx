import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { getContenidosMinimos } from "../../store/slices/contenidosMinimos/contenidosMinimosThunks";
import { getRecomendacionCurriculares } from "../../store/slices/recomendacionCurricular/recomendacionCurricularThunks";
import { DialogActions, Fab, Tooltip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteRecomendacionCurricularesXContenidosMinimos,
  getRecomendacionCurricularesXContenidosMinimosByContenidosMinimos,
  getRecomendacionCurricularesXContenidosMinimosByRecomendacionesCurriculares,
} from "../../store/slices/recomendacionCurricularXContenidosMinimos/recomendacionCurricularXContenidosMinimosThunks";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";
import { Irecomendacion_curricular_x_contenido_minimo_plan_estudio } from "../Models/Irecomendacion_curricular_x_contenido_minimo_plan_estudio";
import { Irecomendacion_curricular } from "../Models/Irecomendacion_curricular";
import { Icontenidos_minimos_plan_estudio } from "../Models/Icontenidos_minimos_plan_estudio";
import { PlayForm } from "../Components/PlayForm";

export const Play = () => {

  //Leer
  const dispatch = useDispatch<AppDispatch>();
  const { contenidosMinimos = [] } = useSelector(
    (state: RootState) => state.contenidosMinimos
  );
  const { recomendacionCurriculares = [] } = useSelector(
    (state: RootState) => state.recomendacionCurricular
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

  }, [
    dispatch,
    contenidosMinimos.length,
    recomendacionCurriculares.length,
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
      flex: 0.2,
      renderCell: (params) => (
        <>
          {/* Botón Editar */}
          <DialogActions>
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
            <Tooltip title="Eliminar">
              <Fab
                color="error"
                size="small"
                onClick={() => {
                  setDeleteRow(params.row);
                  setOpenDialog(true);
                }}
              >
                <Delete />
              </Fab>
            </Tooltip>
            <ToastContainer />
          </DialogActions>

        </>
      ),
    },
  ];
  const paginationModelRecomendacionCurricularXContenidosMinimos = {
    page: 0,
    pageSize: 5,
  };

  //Borrar
  const [deleteRow, setDeleteRow] = useState<Irecomendacion_curricular_x_contenido_minimo_plan_estudio | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteRow !== null) {
      dispatch(deleteRecomendacionCurricularesXContenidosMinimos(deleteRow));
      toast.success("Elemento eliminado exitosamente");
    }
    setDeleteRow(null);
    setOpenDialog(false);
  };

  // Agregar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Irecomendacion_curricular_x_contenido_minimo_plan_estudio | null>(null);
  const agregar = () => {
    if (recomendacionesCurricularesSelect.length == 0) {
      toast.error("Seleccione una Recomendación Curricular");
      return;
    }
    if (contenidosMinimosSelect.length == 0) {
      toast.error("Seleccione un Contenido Mínimo");
      return;
    }
    const filter = recomendacionCurricularesXContenidosMinimos.filter((rcxm) => {
      return (
        rcxm.recomendacionCurricularId == recomendacionesCurricularesSelect[0].recomendacionCurricularId &&
        rcxm.contenidoMinimoPlanEstudioId == contenidosMinimosSelect[0].contenidoMinimoPlanEstudioId
      )
    })
    if (filter.length > 0) {
      toast.error("La asociación ya existe!");
      return;
    }
    setModalAbrir(true);
    setEditState(null);
  };

  //Editar
  const handleEdit = (row: Irecomendacion_curricular_x_contenido_minimo_plan_estudio) => {
    setEditState(row);
    setModalAbrir(true);
  };

  // Estado para seleccionar solo una fila de Recomendaciones Curriculares
  const [recomendacionesCurricularesSelect, setRecomenacionesCurricularesSelect] = useState<Irecomendacion_curricular[]>([]);
  const SelectionRecomendacionesCurriculares = (selectionModel: GridRowSelectionModel) => {
    const selectedData = recomendacionCurriculares.filter((row) => selectionModel.includes(row.recomendacionCurricularId));
    setRecomenacionesCurricularesSelect(selectedData);
    //Buscar RCxCM por RC
    dispatch(getRecomendacionCurricularesXContenidosMinimosByRecomendacionesCurriculares(selectedData[0].recomendacionCurricularId));
  };

  // Estado para seleccionar solo una fila de Contenidos Mínimos
  const [contenidosMinimosSelect, setContenidosMinimosSelect] = useState<Icontenidos_minimos_plan_estudio[]>([]);
  const SelectionContenidosMinimos = (selectionModel: GridRowSelectionModel) => {
    const selectedData = contenidosMinimos.filter((row) => selectionModel.includes(row.contenidoMinimoPlanEstudioId));
    setContenidosMinimosSelect(selectedData);
    //Buscar RCxCM por CM
    dispatch(getRecomendacionCurricularesXContenidosMinimosByContenidosMinimos(selectedData[0].contenidoMinimoPlanEstudioId));
  };

  return (
    // <div style={{ paddingRight: "1%" }}>
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "80vw",
          height: "52vh",
        }}
      >
        {recomendacionCurriculares &&
          <div>
            <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
              Recomendaciones Curriculares
            </div>
            <Paper sx={{ width: "100%", height: "92%" }}>
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
        }
        {contenidosMinimos &&
          <div>
            <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
              Contenidos Mínimos
            </div>
            <Paper sx={{ width: "100%", height: "92%" }}>
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
        }
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "80vw",
          height: "52vh",
          marginTop: "1%"
        }}
      >
        {recomendacionCurricularesXContenidosMinimos &&
          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: '79vw',
              height: '10vh',
              padding: '0 2%',
            }}>
              <h2 style={{ margin: 0, textAlign: "center", flex: 1 }}>Asociación</h2>
              <div style={{ textAlign: "end" }}>
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
            <Paper sx={{ width: "100%", height: "92%" }}>
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
                disableColumnResize
                sx={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  "& .MuiDataGrid-virtualScroller": { overflow: "auto" },
                }}
              />
            </Paper>
            {/* Modal Eliminar */}
            <AlertDialogEliminar open={openDialog} onClose={handleDialogClose} />
          </div>
        }
      </div>
      {/* Modal Agregar/Editar */}
      {modalAbrir &&
        <PlayForm
          open={modalAbrir}
          onClose={() => (
            setModalAbrir(false),
            setEditState(null)
          )}
          editState={editState}
          contenidosMinimosSelect={contenidosMinimosSelect[0].contenidoMinimoPlanEstudioId}
          recomendacionesCurricularesSelect={recomendacionesCurricularesSelect[0].recomendacionCurricularId}
        />
      }
    </div>
  );
};

