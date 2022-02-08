/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

import {
  filterDefaults,
  networkByValue,
  timeGroupingOptions,
} from '../constants/options';

const FilteringContext = createContext({});

/**
 * The FilteringProvider is a context to provide the dashboard filtering options.
 * */
export function FilteringProvider({ children }) {
  FilteringProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const [timeGrouping, setTimeGrouping] = useState(timeGroupingOptions[0].code);

  const [autocompleteSelection, setAutocompleteSelection] = useState(
    filterDefaults.autocompleteSelection
  );

  const [networkSelection, setNetworkSelection] = useState(
    filterDefaults.networkSelection
  );

  const [filters, setFilters] = useState(filterDefaults.autocompleteSelection);

  useEffect(() => {
    setFilters({
      ...autocompleteSelection,
      network:
        networkSelection === 1 ? [] : [networkByValue[networkSelection].code],
    });
  }, [autocompleteSelection, networkSelection]);

  useEffect(() => {
    let newQuery = `${window.location.pathname}?`;

    if (window.location.pathname === '/') {
      newQuery = `/filter?`;
    }

    const initialSize = newQuery.length;

    /**
     * This function verifies if there is a need to add a separator between the query params.
     */
    const trySeparator = () => {
      if (newQuery.length > initialSize) {
        newQuery += '&';
      }
    };

    if (networkSelection !== filterDefaults.networkSelection) {
      trySeparator();
      newQuery += `networkSelection=${networkSelection}`;
    }

    if (newQuery.length === initialSize) {
      window.history.replaceState(null, '', '/');
    } else {
      window.history.replaceState(null, '', newQuery);
    }
  }, [networkSelection, autocompleteSelection]);

  return (
    <FilteringContext.Provider
      value={{
        values: {
          autocompleteSelection,
          networkSelection,
          timeGrouping,
          filters,
        },
        setters: {
          setAutocompleteSelection,
          setNetworkSelection,
          setTimeGrouping,
          setFilters,
        },
        functions: {},
        loaders: {},
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
}

export default FilteringContext;
