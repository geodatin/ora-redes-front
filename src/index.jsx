import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/styles.css';
import Routes from './routes';
import 'fontsource-roboto';
import './i18n/config';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
