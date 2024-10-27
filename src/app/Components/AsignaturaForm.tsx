import { useForm, Controller } from "react-hook-form";
import { Iasignatura } from "../Models/Iasignatura";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postAsignatura, putAsignatura } from "../../store/slices/asignatura/asignaturaThunks";
import { AppDispatch } from "../../store/store";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: Iasignatura | null; // Asignatura a editar (si aplica)
}

export const AsignaturaForm: React.FC<Props> = ({ open, onClose, editState }) => {
  // console.log(editState);
  const dispatch: AppDispatch = useDispatch();

  // Hook useForm de react-hook-form
  const inicialState = {
    asignaturaId: 0,
    codigo: "",
    nombre: "",
    cargaHoraria: 0,
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm<Iasignatura>({ defaultValues: inicialState });

  // Resetear el formulario con los valores de editState cuando cambia
  useEffect(() => {
    if (editState) {
      reset(editState); // Resetea los valores del formulario con los de editState
    } else {
      reset(inicialState);
    }
  }, [editState, reset]);

  const onSubmit = (data: Iasignatura) => {
    if (editState) {
      dispatch(putAsignatura(data));
    } else {
      dispatch(postAsignatura(data));
    }
    onClose(); // Cerrar modal después de agregar/editar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editState ? "Editar" : "Agregar"}</DialogTitle>
      <DialogContent>
        <Controller
          name="codigo"
          control={control}
          rules={{ 
            required: "El código es obligatorio", 
            maxLength: { value: 8, message: "Máximo 8 caracteres" } 
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Código"
              fullWidth
              error={!!errors.codigo}
              helperText={errors.codigo?.message}
            />
          )}
        />
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
          name="cargaHoraria"
          control={control}
          rules={{
            required: "La carga horaria es obligatoria",
            min: { value: 1, message: "Debe ser mayor a 0" },
            max: {value: 9999, message: "Debe ser menor o igual a 9999"}
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Carga Horaria"
              type="number"
              fullWidth
              error={!!errors.cargaHoraria}
              helperText={errors.cargaHoraria?.message}
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
