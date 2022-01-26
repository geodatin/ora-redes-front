import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/styles.css';
import ChartDefaults from './constants/chartDefaults';
import { FilteringProvider } from './contexts/filtering';
import { ThemeProvider } from './contexts/theming';
import Routes from './routes';
import 'fontsource-roboto';
import './i18n/config';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <FilteringProvider>
        <ChartDefaults />
        <CssBaseline />
        <Routes />
      </FilteringProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
