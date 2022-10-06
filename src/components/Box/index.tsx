import React from 'react';
import { BoxProps as MuiBoxProps } from '@material-ui/core/';

import { MuiBox } from './styles';

export type GridProps = MuiBoxProps;

const Box: React.FC<GridProps> = ({ children, ...rest }) => {
  return <MuiBox {...rest}>{children}</MuiBox>;
};

export default Box;
