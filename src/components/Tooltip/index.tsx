import React from 'react';
import { InputAdornment } from '@material-ui/core';
import { FiInfo } from 'react-icons/fi';
import { MuiTooltip, TooltipProps } from './styles';

const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement,
  error,
  children,
  ...rest
}) => {
  return (
    <MuiTooltip
      title={title}
      aria-label="add"
      placement={placement || 'top-end'}
      enterTouchDelay={0}
      error={error}
      {...rest}
    >
      <>
        {children}

        {error && (
          <InputAdornment position="end">
            <FiInfo size={20} />
          </InputAdornment>
        )}
      </>
    </MuiTooltip>
  );
};

export default Tooltip;
