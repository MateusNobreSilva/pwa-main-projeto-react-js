import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { theme } from '../../context/ThemeContext';

export const MuiButton = styled(Button)`
  display: flex;

  &.MuiButton-containedSizeLarge {
    font-size: 1rem;
    min-height: 48px;
  }

  .MuiButton-label {
    text-transform: none;
  }

  &&.Loading {
    background-color: ${theme.palette.primary.main};
  }
`;
