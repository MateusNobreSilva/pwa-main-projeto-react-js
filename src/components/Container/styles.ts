import styled, { css } from 'styled-components';

interface ContainerProps {
  toolbarPadding: boolean;
}

export const ContainerDiv = styled.div<ContainerProps>`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 601px) {
    height: Calc(100%);
    ${props =>
      props.toolbarPadding &&
      css`
        padding-top: 56px;
      `}
  }

  @media (max-width: 600px) {
    height: Calc(100%);
    ${props =>
      props.toolbarPadding &&
      css`
        padding-top: 48px;
      `}
  }
`;
