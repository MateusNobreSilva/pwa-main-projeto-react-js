import styled from 'styled-components';

interface ContainerProps {
  width?: number | string;
  height?: number | string;
  desktopPadding?: number | string;
  mobilePadding?: number | string;
}

export const Container = styled.main<ContainerProps>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  border-radius: 8px;
  display: flex;

  @media (min-width: 601px) {
    padding: ${props => props.desktopPadding || '8px 24px 24px 24px'};
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  @media (max-width: 600px) {
    padding: ${props => props.mobilePadding || '16px 16px 8px 16px'};
    max-width: 100%;
  }
`;
