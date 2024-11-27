import { Api } from "../../../api/Api";

const exportUrl = '/exportar/csv'

export const getArchivoReporte = async (entidad:string) => {
    try{
        const response = await Api.get(`${exportUrl}/${entidad}`, {responseType: 'blob'});
        const archivoCSVBlob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(archivoCSVBlob);
        return url;
    }
    catch (error) {
        console.error("Error al obtener las asignaturas", error);
    }
};


