import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/styles.css';
import ChartDefaults from './constants/chartDefaults';
import Routes from './routes';
import 'fontsource-roboto';
import './i18n/config';
import { ThemeProvider } from './theming/theming';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ChartDefaults />
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
