import React from 'react';
import {
  Routes as BaseRoutes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';

import Header from './components/Header';
import PageOne from './pages/PageOne';

function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <BaseRoutes>
        <Route exact path="/" element={<PageOne />} />
        <Route path="*" render={() => <Navigate to="/" />} />
      </BaseRoutes>
    </BrowserRouter>
  );
}

export default Routes;
