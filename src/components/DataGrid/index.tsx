import React from 'react';
import {
  DataGrid as MuiDataGrid,
  DataGridProps as MuiDataGridProps,
  GridColDef,
  GridColTypeDef,
  GridValueGetterParams,
} from '@material-ui/data-grid';

import Grid, { GridSize } from '../Grid';

export type DataGridColProps = GridColDef[];
export type DataGridValueGetterParams = GridValueGetterParams;
export type DataGridColTypeDef = GridColTypeDef;

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const currencyColumn: DataGridColTypeDef = {
  valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
};

interface DataGridProps extends MuiDataGridProps {
  columns: DataGridColProps;
  rowId?: string;
  xs?: boolean | GridSize;
  sm?: boolean | GridSize;
  md?: boolean | GridSize;
  lg?: boolean | GridSize;
  xl?: boolean | GridSize;
}

const DataGrid: React.FC<DataGridProps> = ({
  rowHeight,
  getRowId,
  rowId,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}) => {
  return (
    <Grid
      item
      xs={
        xs ||
        (sm === undefined &&
        md === undefined &&
        lg === undefined &&
        xl === undefined
          ? 12
          : undefined)
      }
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    >
      <MuiDataGrid
        rowHeight={rowHeight || 48}
        getRowId={getRowId || (rowId ? row => row[rowId] : undefined)}
        {...rest}
      />
    </Grid>
  );
};

export default DataGrid;
