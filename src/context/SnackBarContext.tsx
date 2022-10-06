import React, { createContext, useContext, useCallback, useState } from 'react';
import { Alert, Color } from '@material-ui/lab/';
import { MdClose } from 'react-icons/md';
import Slide from '@material-ui/core/Slide';
import SnackBar from '../components/SnackBar';

export interface snackBarMessage {
  type?: Color;
  message: string;
}

interface SnackBarContextData {
  showSnackBar(message: snackBarMessage): void;
}

const SnackBarContext = createContext<SnackBarContextData>(
  {} as SnackBarContextData,
);

const SnackBarProvider: React.FC = ({ children }) => {
  const [snackMessage, setSnackMessage] = useState('');
  const [snackType, setType] = useState<Color>('info');
  const [open, setOpen] = useState(false);

  const showSnackBar = useCallback(({ type, message }: snackBarMessage) => {
    setSnackMessage(message);
    setType(type || 'info');
    setOpen(true);
  }, []);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      {children}
      <SnackBar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        message={snackMessage}
        TransitionComponent={Slide}
        action={
          <MdClose aria-label="close" color="inherit" onClick={handleClose} />
        }
      >
        <Alert
          onClose={handleClose}
          variant="outlined"
          severity={snackType}
          style={{
            background: '#fff',
            border: 'none',
            boxShadow:
              '0px 3px 5px -1px rgb(0 0 0 / 4%), 0px 6px 10px 0px rgb(0 0 0 / 4%), 0px 1px 18px 0px rgb(0 0 0 / 10%)',
          }}
        >
          {snackMessage}
        </Alert>
      </SnackBar>
    </SnackBarContext.Provider>
  );
};

function useSnackBar(): SnackBarContextData {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error(
      'useSnackBar deve ser utilizado dentro de um SnackBarProvider',
    );
  }

  return context;
}

export { SnackBarProvider, useSnackBar };
