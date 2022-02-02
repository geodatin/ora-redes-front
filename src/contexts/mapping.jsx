/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

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

  function panOnMap(coordinates) {
    mapRef?.setView(coordinates, 10, {
      animate: true,
      pan: {
        duration: 0.5,
      },
    });
  }

  return (
    <MapContext.Provider
      value={{
        values: { mapRef },
        setters: { setMapRef },
        functions: { panOnMap },
        loaders: {},
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export default MapContext;
