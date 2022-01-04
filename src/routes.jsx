import React from 'react';
import {
  Routes as BaseRoutes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';

import Header from './components/Header';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';

function Routes() {
  return (
    <BrowserRouter>
      <Header
        items={[
          { title: 'Page one', to: '/' },
          { title: 'Page two', to: '/page2' },
          { title: 'Page three', to: '/page3' },
        ]}
      />
      <BaseRoutes>
        <Route exact path="/" element={<PageOne />} />
        <Route exact path="/page2" element={<PageTwo />} />
        <Route exact path="/page3" element={<PageOne />} />
        <Route path="*" element={<Navigate to="/" />} />
      </BaseRoutes>
    </BrowserRouter>
  );
}

export default Routes;
