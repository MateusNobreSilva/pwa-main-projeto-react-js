import React from 'react';
import { useViewport } from '../../context/ViewportContext';

const DesktopView: React.FC = ({ children }) => {
  const { isDesktop } = useViewport();
  return <>{isDesktop && children}</>;
};

export default DesktopView;
