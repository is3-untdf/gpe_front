import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteAsignatura, getAsignaturas } from '../../store/slices/asignatura/asignaturaThunks';
import { Fab, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { AsignaturaForm } from "../Components/AsignaturaForm";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Iasignatura } from "../Models/Iasignatura";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";

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

export const Asignatura = () => {
  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { asignaturas = [] } = useSelector((state: RootState) => state.asignatura);
  useEffect(() => {
    dispatch(getAsignaturas());
  }, [dispatch]);

  // Agregar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Iasignatura | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deleteAsignatura(deleteId));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '79vw', height: '10vh' }}>
        <h2 style={{ textAlign: "left" }}>Asignatura</h2>
        <div style={{ textAlign: "end", paddingRight: "2%" }}>
          <Tooltip title="Agregar" aria-label="add">
            <Fab color="primary" onClick={() => (setModalAbrir(true), setEditState(null))}>
              <Add />
            </Fab>
          </Tooltip>
        </div>
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
              <StyledTableCell>Plan de Estudio</StyledTableCell>
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
                <StyledTableCell>{row.planEstudio?.nombre}</StyledTableCell>
                <StyledTableCell style={{ display: "flex" }}>
                  {/* Botón Editar */}
                  <Tooltip title="Editar" >
                    <Fab color="secondary" size="small" style={{ marginRight: "20px" }} onClick={() => (setEditState(row), setModalAbrir(true))} >
                      <Edit />
                    </Fab>
                  </Tooltip>
                  {/* Boton Eliminar */}
                  <Tooltip title="Eliminar">
                    <Fab color="error" size="small" onClick={() => { setDeleteId(row.asignaturaId); setOpenDialog(true) }} >
                      <Delete />
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
      <AsignaturaForm
        open={modalAbrir}
        onClose={() => (setModalAbrir(false), setEditState(null))}
        editState={editState}
      />
    </div>
  )
}

