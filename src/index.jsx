import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/styles.css';
import Routes from './routes';
import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
