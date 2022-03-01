/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

import {
  autocompletePropertyTypes,
  filterDefaults,
  networkByValue,
  timeGroupingOptions,
} from '../constants/options';
import { useQuery } from '../hooks/useQuery';

const FilteringContext = createContext({});

/**
 * The FilteringProvider is a context to provide the dashboard filtering options.
 * */
export function FilteringProvider({ embed, children }) {
  const [timeGrouping, setTimeGrouping] = useState(timeGroupingOptions[0].code);
  const [autocompleteSelection, setAutocompleteSelection] = useState(
    filterDefaults.autocompleteSelection
  );
  const [autocompleteStraightSelection, setAutocompleteStraightSelection] =
    useState(
      Object.keys(autocompleteSelection).map((type) =>
        autocompleteSelection[type].map((value) => ({ value, type }))
      )
    );
  const [networkSelection, setNetworkSelection] = useState(
    filterDefaults.networkSelection
  );
  const query = useQuery();
  const [filters, setFilters] = useState(filterDefaults.autocompleteSelection);
  const [paramsLoaded, setParamsLoaded] = useState(false);

  /**
   * Merge the autocomplete and network selection.
   */
  useEffect(() => {
    setFilters({
      ...autocompleteSelection,
      network:
        networkSelection === 1 ? [] : [networkByValue[networkSelection].code],
    });
  }, [autocompleteSelection, networkSelection]);

  /**
   * Loads the search params.
   */
  useEffect(() => {
    const networkSelectionParam = query.get('networkSelection');
    const searchParam = query.get('search');

    if (
      networkSelectionParam &&
      !Number.isNaN(networkSelectionParam) &&
      !!networkByValue[networkSelectionParam]
    ) {
      setNetworkSelection(networkSelectionParam);
    }

    if (searchParam) {
      const decodedURI = decodeURI(searchParam);
      const queryObject = JSON.parse(decodedURI);
      const paramsKeys = Object.keys(queryObject);

      let isParamsValid = true;

      for (let i = 0; i < paramsKeys.length; i += 1) {
        if (!autocompletePropertyTypes[paramsKeys[i]]) {
          isParamsValid = false;
          break;
        }
      }

      if (isParamsValid) {
        setAutocompleteSelection(queryObject);
        setAutocompleteStraightSelection(
          Object.keys(queryObject).map((type) =>
            queryObject[type].map((value) => ({ value, type }))
          )
        );
      }
    }

    setParamsLoaded(true);
  }, []);

  function generateRoute(start) {
    let newQuery = start;

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

    const selectionAux = {};

    Object.keys(autocompleteSelection).forEach((key) => {
      if (autocompleteSelection[key].length > 0) {
        selectionAux[key] = autocompleteSelection[key];
      }
    });

    if (Object.keys(selectionAux).length > 0) {
      trySeparator();
      const searchValueParams = JSON.stringify(selectionAux);
      const searchValueEncoded = encodeURI(searchValueParams);
      newQuery += `search=${searchValueEncoded}`;
    }

    if (newQuery.length === initialSize) {
      return '/';
    }

    return newQuery;
  }

  /**
   * This useEffect puts the current selection into the route.
   */
  useEffect(() => {
    if (paramsLoaded) {
      if (
        window.location.pathname === '/filter' ||
        window.location.pathname === '/'
      ) {
        window.history.replaceState(null, '', generateRoute(`/filter?`));
      }
    }
  }, [networkSelection, autocompleteSelection]);

  return (
    <FilteringContext.Provider
      value={{
        values: {
          autocompleteSelection,
          autocompleteStraightSelection,
          networkSelection,
          timeGrouping,
          filters,
          embed,
        },
        setters: {
          setAutocompleteSelection,
          setAutocompleteStraightSelection,
          setNetworkSelection,
          setTimeGrouping,
          setFilters,
        },
        functions: {
          generateRoute,
        },
        loaders: {
          paramsLoaded,
        },
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
}

FilteringProvider.defaultProps = {
  embed: false,
};

FilteringProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  embed: PropTypes.bool,
};

export default FilteringContext;
