import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';
import Button from '@material-ui/core/Button';

export const Form = styled(UnForm)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MuiButton = styled(Button)`
  &.MuiButton-containedSizeLarge {
    font-size: 1rem;
    min-height: 48px;
  }

  .MuiButton-label {
    text-transform: none;
  }
`;

export const Title = styled.h1`
  margin: 0 0 4px 0;
  padding: 24px 8px 8px 8px;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;

  width: 100%;
`;
