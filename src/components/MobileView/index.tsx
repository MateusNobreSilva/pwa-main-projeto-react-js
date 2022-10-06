import React from 'react';
import { useViewport } from '../../context/ViewportContext';

const MobileView: React.FC = ({ children }) => {
  const { isMobile } = useViewport();
  return <>{isMobile && children}</>;
};

export default MobileView;
