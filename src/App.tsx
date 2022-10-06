import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './context';

import Routes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <CssBaseline />
      <Routes />
      <GlobalStyle />
    </AppProvider>
  </Router>
);

export default App;
