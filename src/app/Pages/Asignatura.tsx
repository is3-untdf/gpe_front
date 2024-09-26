import { useEffect, useState } from 'react';
import { IAsignatura } from '../Models/Iasignatura';
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { Delete } from '@mui/icons-material';
export const Asignatura = () => {

  //Estilos Tabla
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  //Leer
  const [asignatura, setAsignatura] = useState<IAsignatura[] | null>(null);
  const getAsignatura = () => {
    try {
      const arreglo = [
        {
          id: 1,
          codigo: "AS1",
          nombre: "asignatura 1",
          carga_horaria: 12,
        },
        {
          id: 2,
          codigo: "AS2",
          nombre: "asignatura 2",
          carga_horaria: 9,
        },
        {
          id: 3,
          codigo: "AS3",
          nombre: "asignatura 3",
          carga_horaria: 3,
        }
      ]
      setAsignatura(arreglo);
    } catch (error) {
      console.log(error)
    }
  }

  const eliminar = (row: number) => {
    console.log(row)
  }

  useEffect(() => {
    getAsignatura();
  }, [])

  return (
    <div>
      <h2>Home Page Asignatura</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">Codigo</StyledTableCell>
              <StyledTableCell align="right">Nombre</StyledTableCell>
              <StyledTableCell align="right">Carga Horaria</StyledTableCell>
              <StyledTableCell align="right">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asignatura?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                <StyledTableCell align="right">{row.codigo}</StyledTableCell>
                <StyledTableCell align="right">{row.nombre}</StyledTableCell>
                <StyledTableCell align="right">{row.carga_horaria}</StyledTableCell>
                <StyledTableCell align="right">
                  <Delete color="error" onClick={() => eliminar(row.id)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

