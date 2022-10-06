import React from 'react';
import { ContainerDiv } from './styles';

interface ContainerProps {
  toolbarPadding?: boolean;
}
const Container: React.FC<ContainerProps> = ({ toolbarPadding, children }) => {
  return (
    <ContainerDiv
      toolbarPadding={toolbarPadding !== undefined ? toolbarPadding : true}
    >
      {children}
    </ContainerDiv>
  );
};

export default Container;
