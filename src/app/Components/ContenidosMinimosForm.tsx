import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Icontenidos_minimos_plan_estudio } from "../Models/Icontenidos_minimos_plan_estudio";
import { postContenidosMinimos, putContenidosMinimos } from "../../store/slices/contenidosMinimos/contenidosMinimosThunks";
import { getAsignaturas } from "../../store/slices/asignatura/asignaturaThunks";
import { getIntensidades } from "../../store/slices/intensidad/intensidadThunks";
import { getPlanDeEstudios } from "../../store/slices/planDeEstudio/planDeEstudioThunks";

interface Props {
    open: boolean;
    onClose: () => void;
    editState: Icontenidos_minimos_plan_estudio | null;
}

export const ContenidosMinimosForm: React.FC<Props> = ({ open, onClose, editState }) => {
    // console.log(editState);
    const dispatch: AppDispatch = useDispatch();

    // Leer
    const { asignaturas = [] } = useSelector((state: RootState) => state.asignatura);
    const { planDeEstudios = [] } = useSelector((state: RootState) => state.planDeEstudio);
    const { intensidades = [] } = useSelector((state: RootState) => state.intensidades);
    useEffect(() => {
        dispatch(getAsignaturas());
        dispatch(getPlanDeEstudios());
        dispatch(getIntensidades());
    }, [dispatch]);

    // Hook useForm de react-hook-form
    const inicialState = {
        contenidoMinimoPlanEstudioId: 0,
        nombre: "",
        horasPractica: 0,
        horasTeoria: 0,
        exigencia: "",
        asignaturaId: undefined,
        planEstudioId: undefined,
        intensidadId: undefined,
    };

    const { control, handleSubmit, formState: { errors }, reset } = useForm<Icontenidos_minimos_plan_estudio>({ defaultValues: inicialState });

    // Resetear el formulario con los valores de editState cuando cambia
    useEffect(() => {
        if (editState) {
            reset(editState); // Resetea los valores del formulario con los de editState
        } else {
            reset(inicialState);
        }
    }, [editState, reset]);

    const onSubmit = (data: Icontenidos_minimos_plan_estudio) => {
        if (editState) {
            dispatch(putContenidosMinimos(data));
        } else {
            dispatch(postContenidosMinimos(data));
        }
        onClose(); // Cerrar modal después de agregar/editar
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editState ? "Editar" : "Agregar"}</DialogTitle>
            {/* {asignaturas && planDeEstudios && intensidades && ( */}
                <DialogContent>
                    <Controller
                        name="nombre"
                        control={control}
                        rules={{ required: "El nombre es obligatorio" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Nombre"
                                fullWidth
                                error={!!errors.nombre}
                                helperText={errors.nombre?.message}
                            />
                        )}
                    />
                    <Controller
                        name="horasPractica"
                        control={control}
                        rules={{
                            required: "El campo es obligatoria",
                            min: { value: 1, message: "Debe ser mayor a 0" },
                            max: { value: 9999, message: "Debe ser menor o igual a 9999" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Horas de Práctica"
                                type="number"
                                fullWidth
                                error={!!errors.horasPractica}
                                helperText={errors.horasPractica?.message}
                            />
                        )}
                    />
                    <Controller
                        name="horasTeoria"
                        control={control}
                        rules={{
                            required: "El campo es obligatoria",
                            min: { value: 1, message: "Debe ser mayor a 0" },
                            max: { value: 9999, message: "Debe ser menor o igual a 9999" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Horas de Teoría"
                                type="number"
                                fullWidth
                                error={!!errors.horasTeoria}
                                helperText={errors.horasTeoria?.message}
                            />
                        )}
                    />
                    <Controller
                        name="exigencia"
                        control={control}
                        rules={{
                            required: "El nombre es obligatorio",
                            minLength: { value: 1, message: "Debe ser igual a 1" },
                            maxLength: { value: 1, message: "Debe ser igual a 1" },
                            validate: (value) => (value === "O" || value === "R") || "Debe ser O o R"
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Exigencia O | R"
                                fullWidth
                                error={!!errors.exigencia}
                                helperText={errors.exigencia?.message}
                            />
                        )}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Asignatura</InputLabel>
                        <Controller
                            name="asignaturaId"
                            control={control}
                            rules={{ required: "Selecciona una asignatura" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Asignatura"
                                    error={!!errors.asignaturaId}
                                >
                                    {asignaturas.map((asignatura) => (
                                        <MenuItem key={asignatura.asignaturaId} value={asignatura.asignaturaId}>
                                            {asignatura.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.asignaturaId && <p style={{ color: "red" }}>{errors.asignaturaId.message}</p>}
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Plan de Estudio</InputLabel>
                        <Controller
                            name="planEstudioId"
                            control={control}
                            rules={{ required: "Selecciona un plan de estudio" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Plan de Estudio"
                                    error={!!errors.planEstudioId}
                                >
                                    {planDeEstudios.map((planDeEstudio) => (
                                        <MenuItem key={planDeEstudio.planEstudioId} value={planDeEstudio.planEstudioId}>
                                            {planDeEstudio.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.planEstudioId && <p style={{ color: "red" }}>{errors.planEstudioId.message}</p>}
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Intensidad</InputLabel>
                        <Controller
                            name="intensidadId"
                            control={control}
                            rules={{ required: "Selecciona una intensidad" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Intensidad"
                                    error={!!errors.intensidadId}
                                >
                                    {intensidades.map((intensidad) => (
                                        <MenuItem key={intensidad.intensidadId} value={intensidad.intensidadId}>
                                            {intensidad.descripcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.intensidadId && <p style={{ color: "red" }}>{errors.intensidadId.message}</p>}
                    </FormControl>
                </DialogContent>
            {/* )} */}
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">
                    {editState ? "Guardar" : "Agregar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
