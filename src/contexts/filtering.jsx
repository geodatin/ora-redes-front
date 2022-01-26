/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

import { filterDefaults } from '../constants/options';

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

  const [autocompleteSelection, setAutocompleteSelection] = useState(
    filterDefaults.autocompleteSelection
  );

  return (
    <FilteringContext.Provider
      value={{
        values: { autocompleteSelection },
        setters: { setAutocompleteSelection },
        functions: {},
        loaders: {},
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
}

export default FilteringContext;
