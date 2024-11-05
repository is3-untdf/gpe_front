import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";
import { deleteContenidosMinimos, getContenidosMinimos } from "../../store/slices/contenidosMinimos/contenidosMinimosThunks";
import { Icontenidos_minimos_plan_estudio } from "../Models/Icontenidos_minimos_plan_estudio";
import { ContenidosMinimosForm } from "../Components/ContenidosMinimosForm";

export const ContenidosMinimos = () => {
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
  const { contenidosMinimos = [] } = useSelector((state: RootState) => state.contenidosMinimos);
  useEffect(() => {
    dispatch(getContenidosMinimos());
  }, [dispatch]);

  // Agregar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Icontenidos_minimos_plan_estudio | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deleteContenidosMinimos(deleteId));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
      <h2>Contenidos Mínimos</h2>
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
              <StyledTableCell>Horas Práctica</StyledTableCell>
              <StyledTableCell>Horas Teoría</StyledTableCell>
              <StyledTableCell>Exigencia</StyledTableCell>
              <StyledTableCell>Asignatura</StyledTableCell>
              <StyledTableCell>Intensidad</StyledTableCell>
              <StyledTableCell>-Acción-</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contenidosMinimos?.map((row) => (
              <StyledTableRow key={row.contenidoMinimoPlanEstudioId}>
                <StyledTableCell>{row.contenidoMinimoPlanEstudioId}</StyledTableCell>
                <StyledTableCell>{row.nombre}</StyledTableCell>
                <StyledTableCell>{row.horasPractica}</StyledTableCell>
                <StyledTableCell>{row.horasTeoria}</StyledTableCell>
                <StyledTableCell>{row.exigencia}</StyledTableCell>
                <StyledTableCell>{row.asignatura?.nombre}</StyledTableCell>
                <StyledTableCell>{row.intensidad?.descripcion}</StyledTableCell>
                
                <StyledTableCell style={{ display: "flex" }}>
                  {/* Botón Editar */}
                  <Tooltip title="Editar" >
                    <Fab color="secondary" size="small" style={{ marginRight: "20px" }} onClick={() => (setEditState(row), setModalAbrir(true))}>
                      <Edit />
                    </Fab>
                  </Tooltip>
                  {/* Boton Eliminar */}
                  <Tooltip title="Eliminar">
                    <Fab color="error" size="small" onClick={() => {setDeleteId(row.asignaturaId); setOpenDialog(true)}}>
                      <Delete/>
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
      <ContenidosMinimosForm
        open={modalAbrir}
        onClose={() => (setModalAbrir(false), setEditState(null))}
        editState={editState}
      />
    </div>
  )
}

