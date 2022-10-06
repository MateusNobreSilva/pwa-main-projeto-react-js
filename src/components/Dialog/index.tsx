import React from 'react';

import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps as MuiDialogProps,
} from '@material-ui/core/';

import { ButtonContainer } from './styles';
import Grid from '../Grid';
import Button from '../Button';

interface DialogProps extends MuiDialogProps {
  title?: string;
  message?: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  message,
  cancelButtonLabel,
  confirmButtonLabel,
  onCancel,
  onConfirm,
  children,
  ...rest
}) => {
  return (
    <MuiDialog open={open} {...rest}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {message && <DialogContentText>{message}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <ButtonContainer>
          <Grid container spacing={1} justify="flex-end">
            {onCancel && (
              <Button onClick={onCancel} variant="text" color="primary">
                {cancelButtonLabel || 'CANCELAR'}
              </Button>
            )}

            {onConfirm && (
              <Button onClick={onConfirm} variant="text" color="primary">
                {confirmButtonLabel || 'CONFIRMAR'}
              </Button>
            )}
          </Grid>
        </ButtonContainer>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
