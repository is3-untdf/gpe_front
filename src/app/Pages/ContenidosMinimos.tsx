import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import AlertDialogEliminar from "../Hooks/AlertDialogEliminar";
import { deleteContenidosMinimos, getContenidosMinimos } from "../../store/slices/contenidosMinimos/contenidosMinimosThunks";
import { Icontenidos_minimos_plan_estudio } from "../Models/Icontenidos_minimos_plan_estudio";
import { ContenidosMinimosForm } from "../Components/ContenidosMinimosForm";
import type { RootState, AppDispatch } from "../../store/store";
import { getAsignaturas } from "../../store/slices/asignatura/asignaturaThunks";
import { getPlanDeEstudios } from "../../store/slices/planDeEstudio/planDeEstudioThunks";

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

  //Leer
  const dispatch = useDispatch<AppDispatch>();
  const { contenidosMinimos = [] } = useSelector((state: RootState) => state.contenidosMinimos);
  const { asignaturas = [] } = useSelector((state: RootState) => state.asignatura);
  const { planDeEstudios = [] } = useSelector((state: RootState) => state.planDeEstudio);
  useEffect(() => {
    dispatch(getContenidosMinimos());
    dispatch(getAsignaturas());
    dispatch(getPlanDeEstudios());
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

  // Filtros
  const [filtroExigencia, setFiltroExigencia] = useState("");
  const [filtroAsignatura, setFiltroAsignatura] = useState("");
  const [filtroPlanEstudio, setFiltroPlanEstudio] = useState("");
  const filteredData = contenidosMinimos.filter(row =>
    (filtroExigencia ? row.exigencia === filtroExigencia : true) &&
    (filtroAsignatura ? row.asignatura?.asignaturaId === parseInt(filtroAsignatura) : true) &&
    (filtroPlanEstudio ? row.planEstudio?.planEstudioId === parseInt(filtroPlanEstudio) : true)
  );

  return (
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '79vw', height: '10vh' }}>
        <h2 style={{ textAlign: "left" }}>Contenidos Mínimos</h2>
        <div style={{ textAlign: "end", paddingRight: "2%" }}>
          <Tooltip title="Agregar" aria-label="add">
            <Fab color="primary" onClick={() => (setModalAbrir(true), setEditState(null))}>
              <Add />
            </Fab>
          </Tooltip>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <FormControl fullWidth>
          <InputLabel>Exigencia</InputLabel>
          <Select value={filtroExigencia} onChange={(e) => setFiltroExigencia(e.target.value)}>
            <MenuItem value=""><em>Todos</em></MenuItem>
            <MenuItem value="O">O</MenuItem>
            <MenuItem value="R">R</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Asignatura</InputLabel>
          <Select value={filtroAsignatura} onChange={(e) => setFiltroAsignatura(e.target.value)}>
            <MenuItem value=""><em>Todas</em></MenuItem>
            {asignaturas.map((item, index) => (
              <MenuItem key={index} value={item?.asignaturaId || ""}>
                {item?.nombre || "-"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Plan de Estudio</InputLabel>
          <Select value={filtroPlanEstudio} onChange={(e) => setFiltroPlanEstudio(e.target.value)}>
            <MenuItem value=""><em>Todos</em></MenuItem>
            {planDeEstudios.map((item, index) => (
              <MenuItem key={index} value={item?.planEstudioId || ""}>
                {item?.nombre || "-"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
              <StyledTableCell>Plan de Estudio</StyledTableCell>
              <StyledTableCell>Nivel Intensidad</StyledTableCell>
              <StyledTableCell>-Acción-</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <StyledTableRow key={row.contenidoMinimoPlanEstudioId}>
                <StyledTableCell>{row.contenidoMinimoPlanEstudioId}</StyledTableCell>
                <StyledTableCell>{row.nombre}</StyledTableCell>
                <StyledTableCell>{row.horasPractica}</StyledTableCell>
                <StyledTableCell>{row.horasTeoria}</StyledTableCell>
                <StyledTableCell>{row.exigencia}</StyledTableCell>
                <StyledTableCell>{row.asignatura?.nombre || "-"}</StyledTableCell>
                <StyledTableCell>{row.planEstudio?.nombre || "-"}</StyledTableCell>
                <StyledTableCell>{row.intensidad?.nivel || "-"}</StyledTableCell>
                <StyledTableCell style={{ display: "flex" }}>
                  <Tooltip title="Editar">
                    <Fab color="secondary" size="small" style={{ marginRight: "20px" }} onClick={() => (setEditState(row), setModalAbrir(true))}>
                      <Edit />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <Fab color="error" size="small" onClick={() => { setDeleteId(row.contenidoMinimoPlanEstudioId); setOpenDialog(true) }}>
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
      <AlertDialogEliminar open={openDialog} onClose={handleDialogClose} />

      {/* Modal Agregar */}
      <ContenidosMinimosForm open={modalAbrir} onClose={() => (setModalAbrir(false), setEditState(null))} editState={editState} />
    </div>
  );
};
