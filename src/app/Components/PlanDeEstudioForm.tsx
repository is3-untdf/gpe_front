import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Iplan_estudio } from "../Models/Iplan_estudio";
import { postPlanDeEstudio, putPlanDeEstudio } from "../../store/slices/planDeEstudio/planDeEstudioThunks";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: Iplan_estudio | null; // Asignatura a editar (si aplica)
}

export const PlanDeEstudioForm: React.FC<Props> = ({ open, onClose, editState }) => {
  // console.log(editState);
  const dispatch: AppDispatch = useDispatch();

  // Hook useForm de react-hook-form
  const inicialState = {
    id: 0,
    nombre: "",
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm<Iplan_estudio>({ defaultValues: inicialState });

  // Resetear el formulario con los valores de editState cuando cambia
  useEffect(() => {
    if (editState) {
      reset(editState); // Resetea los valores del formulario con los de editState
    } else {
      reset(inicialState);
    }
  }, [editState, reset]);

  const onSubmit = (data: Iplan_estudio) => {
    if (editState) {
      dispatch(putPlanDeEstudio(data));
    } else {
      dispatch(postPlanDeEstudio(data));
    }
    onClose(); // Cerrar modal después de agregar/editar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editState ? "Editar" : "Agregar"}</DialogTitle>
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
