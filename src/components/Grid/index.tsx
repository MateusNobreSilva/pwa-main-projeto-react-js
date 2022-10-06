import React from 'react';
import {
  Grid as MuiGrid,
  GridProps as MuiGridProps,
  GridJustification as MuiGridJustification,
  GridSize as MuiGridSize,
} from '@material-ui/core/';

export type GridProps = MuiGridProps;
export type GridJustification = MuiGridJustification;
export type GridSize = MuiGridSize;

const Grid: React.FC<GridProps> = ({
  container,
  item,
  spacing,
  children,
  ...rest
}) => {
  return (
    <MuiGrid
      item={item}
      container={
        container === undefined && item === undefined ? true : container
      }
      spacing={spacing === undefined && item === undefined ? 2 : spacing}
      {...rest}
    >
      {children}
    </MuiGrid>
  );
};

export default Grid;
