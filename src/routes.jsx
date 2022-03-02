import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Routes as BaseRoutes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';

import Disclaimer from './components/Disclaimer';
import Header from './components/Header';
import ApiMethods from './pages/ApiMethods';
import Dashboard from './pages/Dashboard';
import DataLibrary from './pages/DataLibrary';

function Routes() {
  const { t } = useTranslation();

  const [openDisclaimer, setOpenDisclaimer] = useState(true);

  return (
    <BrowserRouter>
      <Header
        projectName={t('general.projectName')}
        items={[
          { title: 'Dashboard', to: '/' },
          { title: 'Data library', to: '/library' },
          { title: 'API', to: '/api' },
        ]}
      />
      <BaseRoutes>
        <Route
          exact
          path="/"
          element={
            <>
              <Disclaimer
                open={openDisclaimer}
                handleDisclaimerClose={() => setOpenDisclaimer(false)}
              />
              <Dashboard />
            </>
          }
        />
        <Route exact path="/api" element={<ApiMethods />} />
        <Route exact path="/library" element={<DataLibrary />} />
        <Route path="*" element={<Navigate to="/" />} />
      </BaseRoutes>
    </BrowserRouter>
  );
}

export default Routes;
