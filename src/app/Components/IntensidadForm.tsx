import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Iintensidad } from "../Models/Iintensidad";
import { postIntensidad, putIntensidad } from "../../store/slices/intensidad/intensidadThunks";

interface Props {
    open: boolean;
    onClose: () => void;
    editState: Iintensidad | null; // Asignatura a editar (si aplica)
}

export const IntensidadForm: React.FC<Props> = ({ open, onClose, editState }) => {
    // console.log(editState);
    const dispatch: AppDispatch = useDispatch();

    // Hook useForm de react-hook-form
    const inicialState = {
        intensidadId: 0,
        nivel: "",
        descripcion: "",
    };

    const { control, handleSubmit, formState: { errors }, reset } = useForm<Iintensidad>({ defaultValues: inicialState });

    // Resetear el formulario con los valores de editState cuando cambia
    useEffect(() => {
        if (editState) {
            reset(editState); // Resetea los valores del formulario con los de editState
        } else {
            reset(inicialState);
        }
    }, [editState, reset]);

    const onSubmit = (data: Iintensidad) => {
        if (editState) {
            dispatch(putIntensidad(data));
        } else {
            dispatch(postIntensidad(data));
        }
        onClose(); // Cerrar modal después de agregar/editar
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editState ? "Editar" : "Agregar"}</DialogTitle>
            <DialogContent>
                <Controller
                    name="nivel"
                    control={control}
                    rules={{
                        required: "El campo es obligatorio",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="dense"
                            label="Nivel"
                            fullWidth
                            error={!!errors.descripcion}
                            helperText={errors.descripcion?.message}
                        />
                    )}
                />
                <Controller
                    name="descripcion"
                    control={control}
                    rules={{
                        required: "El campo es obligatorio",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="dense"
                            label="Descripción"
                            multiline
                            fullWidth
                            error={!!errors.descripcion}
                            helperText={errors.descripcion?.message}
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">
                    {editState ? "Guardar" : "Agregar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
