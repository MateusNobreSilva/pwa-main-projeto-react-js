import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { theme } from '../../context/ThemeContext';

export const MuiIconButton = styled(IconButton)`
  display: flex;

  &.MuiIconButton-containedSizeLarge {
    font-size: 1rem;
    min-height: 48px;
  }

  .MuiIconButton-label {
    text-transform: none;
  }

  &&.Loading {
    background-color: ${theme.palette.primary.main};
  }
`;
