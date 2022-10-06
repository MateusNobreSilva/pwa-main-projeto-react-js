import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { IconButtonProps as MuiIconButtonProps } from '@material-ui/core/IconButton';

import Grid, { GridSize } from '../Grid';
import { MuiIconButton } from './styles';

interface IconButtonProps extends MuiIconButtonProps {
  name?: string;
  loading?: boolean;
  disableGrid?: boolean;
  xs?: boolean | GridSize;
  sm?: boolean | GridSize;
  md?: boolean | GridSize;
  lg?: boolean | GridSize;
  xl?: boolean | GridSize;
}

const IconButton: React.FC<IconButtonProps> = ({
  color,
  disabled,
  loading,
  disableGrid,
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}) => {
  return (
    <>
      {disableGrid === undefined || disableGrid ? (
        <MuiIconButton
          color={color || 'inherit'}
          disabled={disabled || loading}
          className={loading ? 'Loading' : ''}
          {...rest}
        >
          {(loading && (
            <CircularProgress size={24} style={{ color: '#fff' }} />
          )) ||
            children}
        </MuiIconButton>
      ) : (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <MuiIconButton
            color={color || 'inherit'}
            disabled={disabled || loading}
            className={loading ? 'Loading' : ''}
            {...rest}
          >
            {(loading && (
              <CircularProgress size={24} style={{ color: '#fff' }} />
            )) ||
              children}
          </MuiIconButton>
        </Grid>
      )}
    </>
  );
};

export default IconButton;
