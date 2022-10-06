import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import styled, { css } from 'styled-components';
import { theme } from '../../context/ThemeContext';

export const MuiDatePicker = styled(DatePicker)`
  display: flex;

  .MuiFormLabel-root {
    color: ${theme.palette.text.disabled};

    &.Mui-focused {
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

  .Mui-focused .MuiInputBase-input {
    color: ${theme.palette.text.primary};
  }

  .MuiOutlinedInput-root {
    .MuiInputAdornment-positionEnd .MuiIconButton-label {
      color: ${theme.palette.text.disabled};
    }

    &.Mui-focused .MuiInputAdornment-positionEnd .MuiIconButton-label {
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
`;

export const MuiKeyboardDatePicker = styled(KeyboardDatePicker)`
  display: flex;

  .MuiFormLabel-root {
    color: ${theme.palette.text.disabled};

    &.Mui-focused {
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

  .Mui-focused .MuiInputBase-input {
    color: ${theme.palette.text.primary};
  }

  .MuiOutlinedInput-root {
    .MuiInputAdornment-positionEnd .MuiIconButton-label {
      color: ${theme.palette.text.disabled};
    }

    &.Mui-focused .MuiInputAdornment-positionEnd .MuiIconButton-label {
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
    padding: 12px;
    margin: -12px;
  }
  .MuiButtonBase-root:focus {
    ${props =>
      props.error
        ? css`
            color: ${theme.palette.error.main};
            svg {
              color: ${theme.palette.error.main};
            }
          `
        : css`
            color: ${theme.palette.primary.main};
            svg {
              color: ${theme.palette.primary.main};
            }
          `}
  }
`;
