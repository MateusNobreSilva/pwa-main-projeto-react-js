import Tooltip, {
  TooltipProps as MuiTooltipProps,
} from '@material-ui/core/Tooltip';
import styled, { css } from 'styled-components';

export interface TooltipProps extends MuiTooltipProps {
  error?: boolean;
}

export const MuiTooltip = styled(Tooltip)<TooltipProps>`
  cursor: pointer;

  ${props =>
    props.error &&
    css`
      svg {
        color: #fe5b5b;
      }
    `}
`;
