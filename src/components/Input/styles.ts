import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton, {
  IconButtonProps as MuiIconButtonProps,
} from '@material-ui/core/IconButton';

import styled, { css } from 'styled-components';

import { theme } from '../../context/ThemeContext';

interface IconButtonProps extends MuiIconButtonProps {
  $error?: boolean;
}

export const MuiTextField = styled(TextField)<TextFieldProps>`
  .MuiOutlinedInput-root {
    .MuiInputAdornment-positionStart {
      color: ${theme.palette.text.disabled};
    }

    &.Mui-focused .MuiInputAdornment-positionStart {
      ${props =>
        props.error
          ? css`
              color: ${theme.palette.error.main};
            `
          : css`
              color: ${theme.palette.primary.main};
            `}
    }

    &.Mui-focused .MuiInputAdornment-positionEnd .MuiIconButton-root {
      ${props =>
        props.error
          ? css`
              color: ${theme.palette.error.main};
            `
          : css`
              color: ${theme.palette.primary.main};
            `}
    }
  }

  .MuiIconButton-root {
    margin-right: -8px;
  }
`;

export const MuiIconButton = styled(IconButton)<IconButtonProps>`
  color: ${theme.palette.text.disabled};

  &:focus {
    ${props =>
      props.$error
        ? css`
            color: ${theme.palette.error.main};
          `
        : css`
            color: ${theme.palette.primary.main};
          `}
  }
`;

export const MuiTooltip = styled(Tooltip)`
  cursor: pointer;

  svg {
    color: #fe5b5b;
  }
`;
