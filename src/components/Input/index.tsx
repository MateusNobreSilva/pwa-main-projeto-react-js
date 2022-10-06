import React, { useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { MdSearch } from 'react-icons/md';
import Grid, { GridSize } from '../Grid';
import { MuiTextField, MuiIconButton, MuiTooltip } from './styles';

interface InputProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  name: string;
  variant?: 'outlined';
  readOnly?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
  xs?: boolean | GridSize;
  sm?: boolean | GridSize;
  md?: boolean | GridSize;
  lg?: boolean | GridSize;
  xl?: boolean | GridSize;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  variant,
  fullWidth,
  readOnly,
  icon: Icon,
  type,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <MuiTextField
        variant={variant || 'outlined'}
        label={label}
        name={name}
        defaultValue={defaultValue}
        inputRef={inputRef}
        type={type}
        autoComplete="off"
        error={!!error}
        fullWidth={fullWidth !== undefined ? fullWidth : true}
        InputProps={{
          inputProps: { tabIndex: readOnly ? -1 : undefined },
          readOnly: readOnly || false,
          startAdornment: Icon && (
            <InputAdornment position="start">
              <Icon size={20} />
            </InputAdornment>
          ),
          endAdornment:
            type === 'search' ? (
              <InputAdornment position="end">
                <MuiIconButton color="primary" type="submit" $error={!!error}>
                  <MdSearch />
                </MuiIconButton>
              </InputAdornment>
            ) : (
              error && (
                <MuiTooltip
                  title={error}
                  aria-label={error}
                  placement="top-end"
                  enterTouchDelay={0}
                >
                  <InputAdornment position="end">
                    {Icon && <FiAlertCircle size={20} />}
                  </InputAdornment>
                </MuiTooltip>
              )
            ),
        }}
        {...rest}
      />
    </Grid>
  );
};

export default Input;
