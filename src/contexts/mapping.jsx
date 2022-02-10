/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

import { layoutConfigs } from '../constants/options';

const MapContext = createContext({});

/**
 * The MappingProvider is a context to provide map ref.
 * */
export function MappingProvider({ children }) {
  MappingProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const [mapRef, setMapRef] = useState();

  const [layoutConfig, setLayoutConfig] = useState(0);

  function panOnMap(coordinates) {
    mapRef?.setView(coordinates, 10, {
      animate: true,
      pan: {
        duration: 0.5,
      },
    });
  }

  function nextLayoutConfig() {
    setLayoutConfig((current) => {
      const next = current + 1;
      return next > layoutConfigs.isRightHidden.length - 1 ? 0 : next;
    });
  }

  return (
    <MapContext.Provider
      value={{
        values: { mapRef, layoutConfig },
        setters: { setMapRef },
        functions: { panOnMap, nextLayoutConfig },
        loaders: {},
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export default MapContext;
