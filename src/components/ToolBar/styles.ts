import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { theme } from '../../context/ThemeContext';

export const MuiAppBar = styled(AppBar)`
  &.MuiAppBar-colorPrimary {
    color: ${theme.palette.text.primary};
    background-color: #fff;
    border: none;
  }
`;

export const MuiToolBar = styled(Toolbar)`
  @media (min-width: 601px) {
    &.MuiToolbar-root {
      min-height: 56px;
      max-height: 56px;
      padding-left: 24px;
      padding-right: 9px;
    }
  }

  @media (max-width: 600px) {
    &.MuiToolbar-root {
      min-height: 48px;
      max-height: 48px;
      padding-left: 16px;
      padding-right: 1px;
    }
  }
`;

export const Title = styled.h1`
  margin: 0px;
  padding: 0px;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;
`;
