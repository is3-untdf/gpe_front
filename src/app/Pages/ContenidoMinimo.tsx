import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { deleteContenidosMinimos, getContenidosMinimosDependencias } from "../../store/slices/contenidosMinimos/contenidosMinimosThunks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Fab, Paper, Tooltip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";
import { ContenidosMinimosForm } from "../Components/ContenidosMinimosForm";
import { Icontenidos_minimos_plan_estudio } from "../Models/Icontenidos_minimos_plan_estudio";

export const ContenidoMinimo = () => {
  // Inicialización de estado y hooks
  const dispatch = useDispatch<AppDispatch>();
  const { contenidosMinimos = [] } = useSelector((state: RootState) => state.contenidosMinimos);

  useEffect(() => {
    dispatch(getContenidosMinimosDependencias());
  }, [dispatch]);

  //Agregar-
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Icontenidos_minimos_plan_estudio | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); //Id a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deleteContenidosMinimos(deleteId));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  const columns: GridColDef[] = [
    // { field: 'contenidoMinimoPlanEstudioId', headerName: 'Id' },
    { field: 'nombre', headerName: 'Nombre', width: 400 },
    { field: 'horasPractica', headerName: 'Hs Práctica' },
    { field: 'horasTeoria', headerName: 'Hs Teoría' },
    { field: 'exigencia', headerName: 'Exigencia' },
    {
      field: 'asignatura',
      headerName: 'Asignatura',
      renderCell: (params) => params.row.asignatura?.nombre || '',
      width: 250,
    },
    {
      field: 'planEstudio',
      headerName: 'Plan de Estudio',
      renderCell: (params) => params.row.planEstudio?.nombre || '',
      width: 150,
    },
    {
      field: 'intensidad',
      headerName: 'Intensidad',
      renderCell: (params) => (params.row.intensidad?.nivel || ''),
      width: 90,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <Fab
              color="secondary"
              size="small"
              style={{ marginRight: "10px" }}
              onClick={() => {
                setEditState(params.row);
                setModalAbrir(true);
              }}
            >
              <Edit />
            </Fab>
          </Tooltip>
          <Tooltip title="Eliminar">
            <Fab
              color="error"
              size="small"
              onClick={() => {
                setDeleteId(params.row.contenidoMinimoPlanEstudioId);
                setOpenDialog(true);
              }}
            >
              <Delete />
            </Fab>
          </Tooltip>
        </>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div style={{ paddingLeft: "1%", paddingRight: "1%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '79vw', height: '10vh' }}>
        <h2 style={{ textAlign: "left" }}>Contenidos Mínimos</h2>
        <div style={{ textAlign: "end", paddingRight: "1%" }}>
          <Tooltip title="Agregar" aria-label="add">
            <Fab color="primary" onClick={() => (setModalAbrir(true), setEditState(null))}>
              <Add />
            </Fab>
          </Tooltip>
        </div>
      </div>

      <Paper sx={{ width: "100%", height: "90%" }}>
        <DataGrid
          rows={contenidosMinimos}
          columns={columns}
          getRowId={(row) => row.contenidoMinimoPlanEstudioId}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            width: '100%',
            height: '100%',
            border: 0,
            '& .MuiDataGrid-virtualScroller': { overflow: 'auto' }
          }}
        />
      </Paper>

      {/* Modal Eliminar */}
      <AlertDialogEliminar open={openDialog} onClose={handleDialogClose} />

      {/* Modal Agregar/Editar */}
      <ContenidosMinimosForm open={modalAbrir} onClose={() => (setModalAbrir(false), setEditState(null))} editState={editState} />
    </div>
  );
};
