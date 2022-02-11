/* eslint-disable react/jsx-no-constructed-context-values */
import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

import { breakpoints } from '../constants/constraints';
import { mobileNavs, panels } from '../constants/options';

const NavigationContext = createContext({});

/**
 * The NavigationProvider is a context to provide navigation data on application.
 * */
export function NavigationProvider({ children }) {
  NavigationProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const isMobile = useMediaQuery(breakpoints.max.lg);

  const [station, setStation] = useState();
  const [panelIndexValue, setPanelIndexValue] = useState(
    panels.statistics.index
  );

  const [mobileNavValue, setMobileNavValue] = useState(mobileNavs.map.value);

  const openStation = (item) => {
    setStation(item);
    setPanelIndexValue(panels.station.index);
    if (isMobile) setMobileNavValue(mobileNavs.panel.value);
  };

  const closeStation = () => {
    setPanelIndexValue(panels.list.index);
    setStation(undefined);
  };

  return (
    <NavigationContext.Provider
      value={{
        values: { mobileNavValue, panelIndexValue, station, isMobile },
        setters: { setMobileNavValue, setPanelIndexValue },
        functions: { openStation, closeStation },
        loaders: {},
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
