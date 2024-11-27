import { Fab, Link, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Download } from "@mui/icons-material";
import { getArchivoReporte } from "../../store/slices/reporte/reporteUtils";

export const Reporte = () => {
  
  interface Entidad {
    nombre: string;
    link: string;
  }

  const entidades: Entidad[] = [
    {nombre: 'Asignaturas', link: 'asignaturas' },
    {nombre: 'Titulos', link: 'titulos' },
    {nombre: 'Planes de Estudio', link: 'planes-de-estudio' },
    {nombre: 'Contenidos Curriculares Basicos', link: 'contenidos-curriculares-basicos' },
    {nombre: 'Actividades Profesionales Reservadas', link: 'actividades-profesionales-reservadas' }
  ];
  
  const descargarReporte = async (link:string) => {
    const urlDescarga = await getArchivoReporte(link);
    const tempLink = document.createElement("a");
    tempLink.href = urlDescarga!;
    const isoString = new Date().toISOString();
    const formattedDate = isoString.replace(/[^\d]/g, '').slice(0, 14);
    tempLink.setAttribute(
      "download",
      `${link}_${formattedDate}.csv`
    );

    // Append the <a> element to the body and click it to trigger the download
    document.body.appendChild(tempLink);
    tempLink.click();
  
    // Clean up the temporary elements and URL
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(urlDescarga!);
  };


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

  return (
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
    <h2>Reportes</h2>
    <div style={{ textAlign: "end", paddingBottom: "1%" }}>
    </div>
    {/* Tabla */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Entidad</StyledTableCell>
            <StyledTableCell>-Acción-</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {entidades?.map((entidad, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{entidad.nombre}</StyledTableCell>
              <StyledTableCell>
                <Fab color="success" size="small">
                  <Download onClick={() => descargarReporte(entidad.link) } />
                </Fab>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}