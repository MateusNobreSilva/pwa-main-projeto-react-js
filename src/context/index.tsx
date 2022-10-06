import React from 'react';

import { AuthProvider } from './AuthContext';
import { SnackBarProvider } from './SnackBarContext';
import { ViewportProvider } from './ViewportContext';
import { ThemeProvider, theme } from './ThemeContext';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <ViewportProvider>
        <SnackBarProvider>{children}</SnackBarProvider>
      </ViewportProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppProvider;
