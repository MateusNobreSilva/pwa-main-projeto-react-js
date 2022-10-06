import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';

import Grid, { GridSize } from '../Grid';
import { MuiButton } from './styles';

interface ButtonProps extends MuiButtonProps {
  name?: string;
  loading?: boolean;
  xs?: boolean | GridSize;
  sm?: boolean | GridSize;
  md?: boolean | GridSize;
  lg?: boolean | GridSize;
  xl?: boolean | GridSize;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  color,
  disabled,
  loading,
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <MuiButton
        variant={variant || 'contained'}
        color={color || 'primary'}
        disableElevation
        disabled={disabled || loading}
        className={loading ? 'Loading' : ''}
        {...rest}
      >
        {(loading && (
          <CircularProgress size={24} style={{ color: '#fff' }} />
        )) ||
          children}
      </MuiButton>
    </Grid>
  );
};

export default Button;
