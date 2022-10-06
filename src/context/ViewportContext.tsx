import React, { useCallback } from 'react';

interface ViewportContextData {
  isMobile: boolean;
  isDesktop: boolean;
}

const mobileWidth = 600;

const viewportContext = React.createContext<ViewportContextData>(
  {} as ViewportContextData,
);

export const ViewportProvider: React.FC = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth <= mobileWidth,
  );
  const [isDesktop, setIsDesktop] = React.useState(
    window.innerWidth > mobileWidth,
  );

  const handleWindowResize = useCallback(() => {
    if (isMobile && window.innerWidth > mobileWidth) {
      setIsMobile(false);
      setIsDesktop(true);
    } else if (isDesktop && window.innerWidth <= mobileWidth) {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, [isMobile, isDesktop]);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);

  return (
    <viewportContext.Provider value={{ isMobile, isDesktop }}>
      {children}
    </viewportContext.Provider>
  );
};

export const useViewport = (): ViewportContextData => {
  const { isMobile, isDesktop } = React.useContext(viewportContext);
  return { isMobile, isDesktop };
};
