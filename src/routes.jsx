import React from 'react';
import {
  Routes as BaseRoutes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';

import Header from './components/Header';
import ApiMethods from './pages/ApiMethods';
import Dashboard from './pages/Dashboard';
import DataLibrary from './pages/DataLibrary';

function Routes() {
  return (
    <BrowserRouter>
      <Header
        items={[
          { title: 'Dashboard example', to: '/' },
          { title: 'API example', to: '/api' },
          { title: 'Data library example', to: '/library' },
        ]}
      />
      <BaseRoutes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/api" element={<ApiMethods />} />
        <Route exact path="/library" element={<DataLibrary />} />
        <Route path="*" element={<Navigate to="/" />} />
      </BaseRoutes>
    </BrowserRouter>
  );
}

export default Routes;
