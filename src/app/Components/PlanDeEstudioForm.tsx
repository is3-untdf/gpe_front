import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Iplan_estudio } from "../Models/Iplan_estudio";
import { clonarPlanDeEstudio, getPlanDeEstudios, postPlanDeEstudio, putPlanDeEstudio } from "../../store/slices/planDeEstudio/planDeEstudioThunks";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  open: boolean;
  onClose: () => void;
  editState: Iplan_estudio | null; // Asignatura a editar (si aplica)
  clonar: boolean; //Si viene del botón de clonar
}

export const PlanDeEstudioForm: React.FC<Props> = ({ open, onClose, editState, clonar }) => {

  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { planDeEstudios = [] } = useSelector((state: RootState) => state.planDeEstudio);
  useEffect(() => {
    dispatch(getPlanDeEstudios());
  }, [dispatch]);

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
  }, [editState, reset, clonar]);

  const onSubmit = (data: Iplan_estudio) => {
    //Verificar si nombre no existe
    if (planDeEstudios?.find(x => x.nombre === data.nombre)) {
      toast.error("Plan de Estudio en uso, elige otro nombre");
    } else {
      onSubmitAplicar(data);
    }
  };
  const onSubmitAplicar = (data: Iplan_estudio) => {
    if (clonar) {
      dispatch(clonarPlanDeEstudio(data));
    } else {
      if (editState) {
        dispatch(putPlanDeEstudio(data));
      } else {
        dispatch(postPlanDeEstudio(data));
      }
    }
    onClose(); // Cerrar modal después de agregar/editar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{clonar ? "Clonar" : (editState ? "Editar" : "Agregar")}</DialogTitle>
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
          {clonar ? "Iniciar" : (editState ? "Guardar" : "Agregar")}
        </Button>
        <ToastContainer />
      </DialogActions>
    </Dialog>
  );
};
