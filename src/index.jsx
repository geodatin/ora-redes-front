import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/styles.css';
import { ThemeProvider } from './contexts/theming';
import Routes from './routes';
import 'fontsource-roboto';
import './i18n/config';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
