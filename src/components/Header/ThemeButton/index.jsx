import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';

import { lightScheme } from '../../../constants/schemes';
import ThemeContext from '../../../theming/theming';
import useStyles from './styles';

/**
 * This component renders a ThemeButton
 * @returns Theme Button
 */
export default function ThemeButton() {
  const classes = useStyles();
  const { selectedTheme, switchTheme } = useContext(ThemeContext);

  /**
   * This function switch the platform theme between dark or light mode.
   * @param {Click} event
   */
  function handleSwitchTheme() {
    if (selectedTheme === lightScheme) {
      switchTheme('dark');
    } else {
      switchTheme('light');
    }
  }

  return (
    <div className={classes.wrapper}>
      <IconButton
        id="theme-button"
        className={classes.button}
        onClick={() => handleSwitchTheme()}
      >
        {selectedTheme === lightScheme ? (
          <DarkModeRoundedIcon style={{ fontSize: 20 }} />
        ) : (
          <LightModeRoundedIcon style={{ fontSize: 20 }} />
        )}
      </IconButton>
    </div>
  );
}
