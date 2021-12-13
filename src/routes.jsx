import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Routes as BaseRoutes,
  Route,
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';

function Routes() {
  return (
    <BrowserRouter>
      <BaseRoutes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="*" render={() => <Navigate to="/" />} />
      </BaseRoutes>
    </BrowserRouter>
  );
}

export default Routes;
