import React from 'react';
import { ToolbarProps as MuiToolBarProps } from '@material-ui/core/Toolbar';
import { MuiAppBar, MuiToolBar, Title } from './styles';
import Box from '../Box';

interface ToolBarProps extends MuiToolBarProps {
  title?: string;
}

const ToolBar: React.FC<ToolBarProps> = ({ title, children, ...rest }) => {
  return (
    <MuiAppBar position="fixed" variant="outlined">
      <MuiToolBar {...rest} disableGutters>
        {title && <Title>{title}</Title>}
        <Box justifyContent="flex-end">{children}</Box>
      </MuiToolBar>
    </MuiAppBar>
  );
};

export default ToolBar;
