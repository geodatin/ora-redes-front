import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Routes as BaseRoutes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';

import Header from './components/Header';
import { MappingProvider } from './contexts/mapping';
import { PanelRoutingProvider } from './contexts/panelRouting';
import ApiMethods from './pages/ApiMethods';
import Dashboard from './pages/Dashboard';
import DataLibrary from './pages/DataLibrary';

function Routes() {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <Header
        projectName={t('general.projectName')}
        items={[
          { title: t('header.buttons.dashboard'), to: '/' },
          { title: t('header.buttons.dataLibrary'), to: '/library' },
          { title: t('header.buttons.api'), to: '/api' },
        ]}
      />
      <BaseRoutes>
        <Route
          exact
          path="/"
          element={
            <MappingProvider>
              <PanelRoutingProvider>
                <Dashboard />
              </PanelRoutingProvider>
            </MappingProvider>
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
