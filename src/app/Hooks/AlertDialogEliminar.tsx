import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertDialogEliminar({ open, onClose, onConfirm }: AlertDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Eliminar"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Está seguro de que desea eliminar este registro?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          No
        </Button>
        <Button onClick={onConfirm} color="success" autoFocus>
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  );
}
