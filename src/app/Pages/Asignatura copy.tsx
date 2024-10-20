import { useEffect, useState } from "react";
import { IAsignatura } from "../Models/Iasignatura";
import {
  Fab,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";
import { AsignaturaForm } from "../Components/AsignaturaForm";

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
  const [asignatura, setAsignatura] = useState<IAsignatura[] | null>(null);
  const getAsignatura = () => {
    const arreglo = [
      { id: 1, codigo: "AS1", nombre: "asignatura 1", carga_horaria: 12 },
      { id: 2, codigo: "AS2", nombre: "asignatura 2", carga_horaria: 9 },
      { id: 3, codigo: "AS3", nombre: "asignatura 3", carga_horaria: 3 },
    ];
    setAsignatura(arreglo);
  };

  // Eliminar
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const eliminarClick = (rowId: number) => {
    setSelectedRow(rowId);
    setOpenDialog(true);
  };
  const handleConfirmDelete = () => {
    if (selectedRow !== null && asignatura) {
      const filteredAsignaturas = asignatura.filter(
        (row) => row.id !== selectedRow
      );
      setAsignatura(filteredAsignaturas);
    }
    setOpenDialog(false);
  };
  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  // Agregar
  const [modalAgregar, setModalAgregar] = useState(false);
  const handleAgregar = (newAsignatura: IAsignatura) => {
    if (asignatura) {
      const nuevaAsignatura = {
        ...newAsignatura,
        id: asignatura.length + 1, // Asignar nuevo id
      };
      setAsignatura([...asignatura, nuevaAsignatura]);
    }
  };

  // General
  useEffect(() => {
    getAsignatura();
  }, []);

  return (
    <div>
      <h2>Home Page Asignatura</h2>
      <div style={{ textAlign: "end", paddingBottom: "2%" }}>
        <Tooltip title="Agregar" aria-label="add">
          <Fab color="primary" onClick={() => setModalAgregar(true)}>
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
              <StyledTableCell align="right">Código</StyledTableCell>
              <StyledTableCell align="right">Nombre</StyledTableCell>
              <StyledTableCell align="right">Carga Horaria</StyledTableCell>
              <StyledTableCell align="right">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asignatura?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.codigo}</StyledTableCell>
                <StyledTableCell align="right">{row.nombre}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.carga_horaria}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Tooltip title="Eliminar">
                    <Delete
                      color="error"
                      onClick={() => eliminarClick(row.id)}
                    />
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
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* Agregar */}
      <AsignaturaForm
        open={modalAgregar}
        onClose={() => setModalAgregar(false)}
        onAgregar={handleAgregar}
      />
    </div>
  );
};
