/* eslint-disable react/jsx-no-constructed-context-values */
import {
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from '@mui/material/';
import { createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as JssThemeProvider } from 'react-jss';

import { lightScheme, darkScheme } from '../constants/schemes';

const ThemeContext = createContext({});

/**
 * The ThemeProvider is a wrapper to JssThemeProvider that allows switch themes.
 * */
export function ThemeProvider({ children }) {
  ThemeProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [selectedTheme, setSelectedTheme] = useState(lightScheme);

  /**
   * Load last selected theme or the prefered color scheme.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('@ora/lastTheme');

    if (savedTheme) {
      setSelectedTheme(savedTheme === 'light' ? lightScheme : darkScheme);
    } else {
      setSelectedTheme(prefersDarkMode ? darkScheme : lightScheme);
    }
  }, [prefersDarkMode]);

  /**
   * Switch the theme mode between light, dark or an auto value based on css prefers-color-scheme.
   */
  function switchTheme(themingMode) {
    if (themingMode === 'light' || themingMode === 'dark') {
      setSelectedTheme(themingMode === 'light' ? lightScheme : darkScheme);
      localStorage.setItem('@ora/lastTheme', themingMode);
    } else {
      setSelectedTheme(prefersDarkMode ? darkScheme : lightScheme);
      localStorage.removeItem('@ora/lastTheme');
    }
  }

  /**
   * Generate a theme to be used on Material-ui components.
   */
  const muiTheme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '20.8px',
          letterSpacing: '-0.00833em',
        },
        palette: {
          background: {
            default: selectedTheme.background.main,
          },
          primary: {
            main: selectedTheme.primary.main,
          },
          secondary: {
            main: selectedTheme.primary.main,
          },
          text: {
            primary: selectedTheme.secondary.dark,
            secondary: selectedTheme.neutral.gray.main,
          },
        },
      }),
    [selectedTheme]
  );

  return (
    <ThemeContext.Provider value={{ switchTheme, selectedTheme }}>
      <JssThemeProvider theme={selectedTheme}>
        <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
      </JssThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
