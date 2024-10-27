import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";
import { deleteIntensidad, getIntensidades } from "../../store/slices/intensidad/intensidadThunks";
import { Iintensidad } from "../Models/Iintensidad";
import { IntensidadForm } from "../Components/IntensidadForm";

export const Intensidad = () => {
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
  const { intensidades = [] } = useSelector((state: RootState) => state.intensidades);
  useEffect(() => {
    dispatch(getIntensidades());
  }, [dispatch]);

  // Agregar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Iintensidad | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deleteIntensidad(deleteId));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  useEffect(() => {
    console.log(intensidades)
  }, [intensidades])

  return (
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
      <h2>Intensidad</h2>
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
              <StyledTableCell>IntensidadId</StyledTableCell>
              <StyledTableCell>Nivel</StyledTableCell>
              <StyledTableCell>Descripción</StyledTableCell>
              <StyledTableCell>-Acción-</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {intensidades?.map((row) => (
              <StyledTableRow key={row.intensidadId}>
                <StyledTableCell>{row.intensidadId}</StyledTableCell>
                <StyledTableCell>{row.nivel}</StyledTableCell>
                <StyledTableCell>{row.descripcion}</StyledTableCell>
                <StyledTableCell style={{ display: "flex" }}>
                  {/* Botón Editar */}
                  <Tooltip title="Editar" >
                    <Fab color="secondary" size="small" style={{ marginRight: "20px" }}>
                    {/* <Fab color="secondary" size="small"> */}
                      <Edit onClick={() => (setEditState(row), setModalAbrir(true))} />
                    </Fab>
                  </Tooltip>
                  {/* Boton Eliminar */}
                  <Tooltip title="Eliminar">
                    <Fab color="error" size="small" >
                      <Delete onClick={() => { setDeleteId(row.intensidadId); setOpenDialog(true) }} />
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
      <IntensidadForm
        open={modalAbrir}
        onClose={() => (setModalAbrir(false), setEditState(null))}
        editState={editState}
      />
    </div>
  )
}

