/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Routes as BaseRoutes,
  Route,
  BrowserRouter,
  Navigate,
  useSearchParams,
} from 'react-router-dom';

import Disclaimer from './components/Disclaimer';
import Header from './components/Header';
import { FilteringProvider } from './contexts/filtering';
import { MappingProvider } from './contexts/mapping';
import { NavigationProvider } from './contexts/navigation';
// import ApiMethods from './pages/ApiMethods';
import Dashboard from './pages/Dashboard';
// import DataLibrary from './pages/DataLibrary';

function FilteringWrapper({ redirect, children }) {
  const [searchParams] = useSearchParams();

  if ([...searchParams].length === 0) {
    return <Navigate replace to={redirect} />;
  }

  return children;
}

function DefaultPage({ embed }) {
  return (
    <NavigationProvider>
      <FilteringProvider embed={embed}>
        <MappingProvider>
          <Disclaimer />
          <Dashboard />
        </MappingProvider>
      </FilteringProvider>
    </NavigationProvider>
  );
}

function Routes() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <Header
        projectName={t('general.projectName')}
        items={[
          {
            title: t('header.buttons.dashboard'),
            to: `/${process.env.REACT_APP_URL_BASE}`,
          },
          /* { title: t('header.buttons.dataLibrary'), to: '/library' },
          { title: t('header.buttons.api'), to: '/api' }, */
        ]}
      />
      <BaseRoutes>
        <Route
          exact
          path={`/${process.env.REACT_APP_URL_BASE}`}
          element={<DefaultPage />}
        />
        <Route
          exact
          path={`/${process.env.REACT_APP_URL_BASE}/filter`}
          element={
            <FilteringWrapper redirect={`/${process.env.REACT_APP_URL_BASE}`}>
              <DefaultPage />
            </FilteringWrapper>
          }
        />
        <Route
          exact
          path={`/${process.env.REACT_APP_URL_BASE}/embed`}
          element={<DefaultPage embed />}
        />
        {/* <Route exact path="/api" element={<ApiMethods />} />
        <Route exact path="/library" element={<DataLibrary />} /> */}
        <Route
          path="*"
          element={
            <Navigate replace to={`/${process.env.REACT_APP_URL_BASE}`} />
          }
        />
      </BaseRoutes>
    </BrowserRouter>
  );
}

export default Routes;
