/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Routes as BaseRoutes,
  Route,
  BrowserRouter,
  Navigate,
  useSearchParams,
} from 'react-router-dom';

import Header from './components/Header';
import { MappingProvider } from './contexts/mapping';
import { PanelRoutingProvider } from './contexts/panelRouting';
import ApiMethods from './pages/ApiMethods';
import Dashboard from './pages/Dashboard';
import DataLibrary from './pages/DataLibrary';

function FilteringWrapper({ redirect, children }) {
  const [params] = useSearchParams();

  if (params.keys.length === 0) {
    return <Navigate replace to={redirect} />;
  }

  return children;
}

function Routes() {
  const { t } = useTranslation();

  const defaultPage = useMemo(
    () => (
      <MappingProvider>
        <PanelRoutingProvider>
          <Dashboard />
        </PanelRoutingProvider>
      </MappingProvider>
    ),
    []
  );

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
        <Route exact path="/" element={defaultPage} />
        <Route
          exact
          path="/filter"
          element={
            <FilteringWrapper redirect="/">{defaultPage}</FilteringWrapper>
          }
        />
        <Route exact path="/api" element={<ApiMethods />} />
        <Route exact path="/library" element={<DataLibrary />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </BaseRoutes>
    </BrowserRouter>
  );
}

export default Routes;
