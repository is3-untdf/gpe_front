import { useForm, Controller } from "react-hook-form";
import { Iasignatura } from "../Models/Iasignatura";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAsignatura, putAsignatura } from "../../store/slices/asignatura/asignaturaThunks";
import { AppDispatch, RootState } from "../../store/store";
import { getPlanDeEstudios } from "../../store/slices/planDeEstudio/planDeEstudioThunks";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: Iasignatura | null; // Asignatura a editar (si aplica)
}

export const AsignaturaForm: React.FC<Props> = ({ open, onClose, editState }) => {
  // console.log(editState);

  //Leer
  const dispatch = useDispatch<AppDispatch>();
  const { planDeEstudios = [] } = useSelector((state: RootState) => state.planDeEstudio);

  // Hook useForm de react-hook-form
  const inicialState = {
    asignaturaId: 0,
    codigo: "",
    nombre: "",
    cargaHoraria: 0,
    planEstudioId: undefined,
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm<Iasignatura>({ defaultValues: inicialState });

  // Resetear el formulario con los valores de editState cuando cambia
  useEffect(() => {
    dispatch(getPlanDeEstudios());
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
            max: { value: 9999, message: "Debe ser menor o igual a 9999" }
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
        <FormControl fullWidth margin="dense">
          <InputLabel>Plan de Estudio</InputLabel>
          <Controller
            name="planEstudioId"
            control={control}
            rules={{ required: "Selecciona un Plan de Estudio" }}
            render={({ field }) => (
              <Select
                {...field}
                label="Plan de Estudio"
                error={!!errors.planEstudioId}
              >
                {planDeEstudios.map((PlanDeEstudio) => (
                  <MenuItem key={PlanDeEstudio.planEstudioId} value={PlanDeEstudio.planEstudioId}>
                    {PlanDeEstudio.nombre}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.planEstudioId && <p style={{ color: "red" }}>{errors.planEstudioId.message}</p>}
        </FormControl>
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
