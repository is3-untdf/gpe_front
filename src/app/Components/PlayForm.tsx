import { Controller, useForm } from "react-hook-form";
import { Irecomendacion_curricular_x_contenido_minimo_plan_estudio } from "../Models/Irecomendacion_curricular_x_contenido_minimo_plan_estudio";
import { useEffect } from "react";
import { Icontenidos_minimos_plan_estudio } from "../Models/Icontenidos_minimos_plan_estudio";
import { Irecomendacion_curricular } from "../Models/Irecomendacion_curricular";
import {
  postRecomendacionCurricularesXContenidosMinimos,
  putRecomendacionCurricularesXContenidosMinimos,
} from "../../store/slices/recomendacionCurricularXContenidosMinimos/recomendacionCurricularXContenidosMinimosThunks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getIntensidades } from "../../store/slices/intensidad/intensidadThunks";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: Irecomendacion_curricular_x_contenido_minimo_plan_estudio | null; //Editar (si aplica)
  recomendacionCurriculares: Irecomendacion_curricular[] | null;
  contenidosMinimos: Icontenidos_minimos_plan_estudio[] | null;
}

export const PlayForm: React.FC<Props> = ({
  open,
  onClose,
  editState,
  recomendacionCurriculares,
  contenidosMinimos,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { intensidades = [] } = useSelector(
    (state: RootState) => state.intensidades
  );
  useEffect(() => {
    if (intensidades.length == 0) {
      dispatch(getIntensidades());
    }
  }, [dispatch]);

  // Hook useForm de react-hook-form
  const inicialState = {
    recomendacionCurricularXContenidoMinimoPlanEstudioId: 0,
    recomendacionCurricularId: undefined,
    contenidoMinimoPlanEstudioId: undefined,
    horasPractica: "",
    horasTeoria: "",
    exigencia: "",
    intensidadId: 0,
    observaciones: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Irecomendacion_curricular_x_contenido_minimo_plan_estudio>({
    defaultValues: inicialState,
  });

  // Resetear el formulario con los valores de editState cuando cambia
  useEffect(() => {
    if (editState) {
      reset(editState); // Resetea los valores del formulario con los de editState
    } else {
      reset(inicialState);
    }
  }, [editState, reset]);

  const onSubmit = (
    data: Irecomendacion_curricular_x_contenido_minimo_plan_estudio
  ) => {
    if (editState) {
      dispatch(putRecomendacionCurricularesXContenidosMinimos(data));
    } else {
      dispatch(postRecomendacionCurricularesXContenidosMinimos(data));
    }
    onClose(); // Cerrar modal después de agregar/editar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editState ? "Editar" : "Agregar"}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel>Recomendación Curricular</InputLabel>
          <Controller
            name="recomendacionCurricularId"
            control={control}
            rules={{ required: "Selecciona una Recomendación Curricular" }}
            render={({ field }) => (
              <Select
                {...field}
                label="Recomendación Curricular"
                error={!!errors.recomendacionCurricularId}
              >
                {recomendacionCurriculares &&
                  recomendacionCurriculares.map((recomendacionCurriculares) => (
                    <MenuItem
                      key={recomendacionCurriculares.recomendacionCurricularId}
                      value={
                        recomendacionCurriculares.recomendacionCurricularId
                      }
                    >
                      {recomendacionCurriculares.nombre}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
          {errors.recomendacionCurricularId && (
            <p style={{ color: "red" }}>
              {errors.recomendacionCurricularId.message}
            </p>
          )}
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Contenidos Mínimos</InputLabel>
          <Controller
            name="contenidoMinimoPlanEstudioId"
            control={control}
            rules={{ required: "Selecciona un Contenido Mínimo" }}
            render={({ field }) => (
              <Select
                {...field}
                label="Contenido Mínimo"
                error={!!errors.contenidoMinimoPlanEstudioId}
              >
                {contenidosMinimos &&
                  contenidosMinimos.map((contenidosMinimos) => (
                    <MenuItem
                      key={contenidosMinimos.contenidoMinimoPlanEstudioId}
                      value={contenidosMinimos.contenidoMinimoPlanEstudioId}
                    >
                      {contenidosMinimos.nombre}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
          {errors.contenidoMinimoPlanEstudioId && (
            <p style={{ color: "red" }}>
              {errors.contenidoMinimoPlanEstudioId.message}
            </p>
          )}
        </FormControl>

        <Controller
          name="horasPractica"
          control={control}
          rules={{
            required: "El campo es obligatorio",
            min: { value: 1, message: "Debe ser mayor a 0" },
            max: { value: 9999, message: "Debe ser menor o igual a 9999" },
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
            required: "El campo es obligatorio",
            min: { value: 1, message: "Debe ser mayor a 0" },
            max: { value: 9999, message: "Debe ser menor o igual a 9999" },
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
            validate: (value) =>
              value === "O" || value === "R" || "Debe ser O o R",
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
                  <MenuItem
                    key={intensidad.intensidadId}
                    value={intensidad.intensidadId}
                  >
                    {intensidad.descripcion}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.intensidadId && (
            <p style={{ color: "red" }}>{errors.intensidadId.message}</p>
          )}
        </FormControl>
        <Controller
          name="observaciones"
          control={control}
          rules={{
            required: "El campo es obligatorio",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Observaciones"
              multiline
              fullWidth
              error={!!errors.observaciones}
              helperText={errors.observaciones?.message}
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
