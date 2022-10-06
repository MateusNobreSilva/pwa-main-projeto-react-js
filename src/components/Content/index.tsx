import React from 'react';
import { Container } from './styles';

interface ContentProps {
  width?: number | string;
  height?: number | string;
  desktopPadding?: number | string;
  mobilePadding?: number | string;
}

const Content: React.FC<ContentProps> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Content;
