import { Add, CopyAll, Delete, Edit } from "@mui/icons-material";
import { Fab, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlanDeEstudio, getPlanDeEstudios } from "../../store/slices/planDeEstudio/planDeEstudioThunks";
import type { AppDispatch, RootState } from "../../store/store";
import { PlanDeEstudioForm } from "../Components/PlanDeEstudioForm";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";
import { Iplan_estudio } from "../Models/Iplan_estudio";

export const PlanDeEstudio = () => {
  // Estilos Tabla
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { planDeEstudios = [] } = useSelector((state: RootState) => state.planDeEstudio);
  useEffect(() => {
    dispatch(getPlanDeEstudios());
  }, [dispatch]);

  // Agregar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Iplan_estudio | null>(null);
  
  //Clonar
  const [clonar, setClonar] = useState(false);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deletePlanDeEstudio(deleteId));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
      <h2>Plan de Estudio</h2>
      <div style={{ textAlign: "end", paddingBottom: "1%" }}>
        {/* Agregar */}
        <Tooltip title="Agregar" aria-label="add">
          <Fab color="primary" onClick={() => (setModalAbrir(true), setEditState(null))}>
            <Add />
          </Fab>
        </Tooltip>
      </div>
      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>-Acción-</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planDeEstudios?.map((row) => (
              <StyledTableRow key={row.planEstudioId}>
                <StyledTableCell>{row.planEstudioId}</StyledTableCell>
                <StyledTableCell>{row.nombre}</StyledTableCell>
                <StyledTableCell style={{ display: "flex" }}>
                  {/* Botón Editar */}
                  <Tooltip title="Editar" >
                    <Fab color="secondary" size="small" style={{ marginRight: "20px" }} onClick={() => (setEditState(row), setModalAbrir(true))}>
                      <Edit />
                    </Fab>
                  </Tooltip>
                  {/* Boton Eliminar */}
                  <Tooltip title="Eliminar">
                    <Fab color="error" size="small" style={{ marginRight: "20px" }} onClick={() => { setDeleteId(row.planEstudioId); setOpenDialog(true) }}>
                      <Delete />
                    </Fab>
                  </Tooltip>
                  {/* Boton Clonar */}
                  <Tooltip title="Clonar este Plan de Estudio">
                    <Fab color="info" size="small" onClick={() => (setEditState(row), setModalAbrir(true), setClonar(true))} >
                      <CopyAll />
                    </Fab>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modal Eliminar */}
      <AlertDialogEliminar
        open={openDialog}
        onClose={handleDialogClose}
      />
      {/* Modal Agregar */}
      <PlanDeEstudioForm
        open={modalAbrir}
        onClose={() => (setModalAbrir(false), setEditState(null), setClonar(false))}
        editState={editState}
        clonar={clonar}
      />
    </div>
  )
}


