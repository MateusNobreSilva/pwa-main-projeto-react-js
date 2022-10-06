import React, { CSSProperties } from 'react';
import { ListItem as MuiListItem, ListItemText } from '@material-ui/core/';

interface ListItemProps {
  primary?: string;
  secondary?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ListItem: React.FC<ListItemProps> = ({
  primary,
  secondary,
  style,
  onClick,
  children,
  ...rest
}) => {
  return (
    <MuiListItem button style={style} onClick={onClick} {...rest}>
      {!children && <ListItemText primary={primary} secondary={secondary} />}
      {children}
    </MuiListItem>
  );
};

export default ListItem;
