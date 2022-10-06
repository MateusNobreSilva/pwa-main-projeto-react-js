import React from 'react';
import { Snackbar as MuiSnackBar } from '@material-ui/core/';
import { SnackbarProps as MuiSnackBarProps } from '@material-ui/core/Snackbar';

type SnackBarProps = MuiSnackBarProps;

const SnackBar: React.FC<SnackBarProps> = ({ ...rest }) => {
  return <MuiSnackBar {...rest} />;
};

export default SnackBar;
