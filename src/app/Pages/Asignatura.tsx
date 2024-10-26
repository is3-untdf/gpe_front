import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteAsignatura, getAsignaturas } from './../../store/slices/asignatura/thunks';
import { Fab, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { AsignaturaForm } from "../Components/AsignaturaForm";
import { Add, Delete, Edit } from "@mui/icons-material";
import { IAsignatura } from "../Models/Iasignatura";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";

export const Asignatura = () => {
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
  const { asignaturas = [] } = useSelector((state: RootState) => state.asignatura);
  useEffect(() => {
    dispatch(getAsignaturas());
  }, [dispatch]);

  // Agregar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<IAsignatura | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false); // Estado del modal
  const borrar = (asignaturaId: number) => {
    setDeleteId(asignaturaId); // Guarda el ID de la asignatura a eliminar
    setOpenDialog(true);       // Abre el modal de confirmación
  };
  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteAsignatura(deleteId)); // Despacha la acción para eliminar
    }
    setDeleteId(null);       // Restablece el ID
    setOpenDialog(false);    // Cierra el modal
  };
  const handleCancelDelete = () => {
    setDeleteId(null);    // Restablece el ID
    setOpenDialog(false); // Cierra el modal sin eliminar
  };


  return (
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
      <h2>Asignatura</h2>
      <div style={{ textAlign: "end", paddingBottom: "1%" }}>
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
              <StyledTableCell>AsignaturaId</StyledTableCell>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Carga Horaria</StyledTableCell>
              <StyledTableCell>-Acción-</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asignaturas?.map((row) => (
              <StyledTableRow key={row.asignaturaId}>
                <StyledTableCell>{row.asignaturaId}</StyledTableCell>
                <StyledTableCell>{row.codigo}</StyledTableCell>
                <StyledTableCell>{row.nombre}</StyledTableCell>
                <StyledTableCell>{row.cargaHoraria}</StyledTableCell>
                <StyledTableCell >
                  <Tooltip title="Editar" >
                    <Fab color="secondary" size="small" style={{ marginRight: "20px" }}>
                      <Edit onClick={() => (setEditState(row), setModalAbrir(true))} />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <Fab color="error" size="small" >
                      <Delete onClick={() => borrar(row.asignaturaId)} />
                    </Fab>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Eliminar */}
      <AlertDialogEliminar
        open={openDialog}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
      />

      {/* Agregar */}
      <AsignaturaForm
        open={modalAbrir}
        onClose={() => (setModalAbrir(false), setEditState(null))}
        editState={editState}
      />
    </div>
  )
}

