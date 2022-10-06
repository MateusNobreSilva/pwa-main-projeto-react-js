import React from 'react';
import { List as MuiList, ListProps as MuiListProps } from '@material-ui/core/';

type SimpleListProps = MuiListProps;

const SimpleList: React.FC<SimpleListProps> = ({ children, ...rest }) => {
  return <MuiList {...rest}>{children}</MuiList>;
};

export default SimpleList;
