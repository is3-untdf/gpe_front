import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getAsignaturas } from './../../store/slices/asignatura/thunks';
import { Fab, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { AsignaturaForm } from "../Components/AsignaturaForm";
import { Add, Edit } from "@mui/icons-material";
import { IAsignatura } from "../Models/Iasignatura";

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
    console.log(asignaturas);
  }, [asignaturas])

  useEffect(() => {
    dispatch(getAsignaturas());
  }, [dispatch]);

  // Agregar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<IAsignatura | null>(null);

  return (
    <div>
      <h2>Asignatura</h2>
      <div style={{ textAlign: "end", paddingBottom: "2%" }}>
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
                <StyledTableCell align="center">
                  {/* <StyledTableCell align="right">
                  <Tooltip title="Eliminar">
                    <Delete
                      color="error"
                      onClick={() => eliminarClick(row.id)}
                    />
                  </Tooltip>
                </StyledTableCell> */}
                  <Tooltip title="Editar" aria-label="add">
                    <Fab size="small" color="secondary" onClick={() => (setEditState(row), setModalAbrir(true))}>
                      <Edit />
                    </Fab>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Eliminar */}
      {/* <AlertDialogEliminar
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      /> */}

      {/* Agregar */}
      <AsignaturaForm
        open={modalAbrir}
        onClose={() => (setModalAbrir(false), dispatch(getAsignaturas()))}
        editState={editState}
      />
    </div>
  )
}

