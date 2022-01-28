/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

import { panels } from '../constants/options';

const PanelRoutingContext = createContext({});

/**
 * The PanelRoutingProvider is a context to provide the info panel routing.
 * */
export function PanelRoutingProvider({ children }) {
  PanelRoutingProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const [station, setStation] = useState();

  const [panelIndexValue, setPanelIndexValue] = useState(
    panels.statistics.index
  );

  const openStation = (item) => {
    setStation(item);
    setPanelIndexValue(panels.station.index);
  };

  const closeStation = () => {
    setPanelIndexValue(panels.list.index);
    setStation(undefined);
  };

  return (
    <PanelRoutingContext.Provider
      value={{
        values: { panelIndexValue, station },
        setters: { setPanelIndexValue },
        functions: { openStation, closeStation },
        loaders: {},
      }}
    >
      {children}
    </PanelRoutingContext.Provider>
  );
}

export default PanelRoutingContext;
