import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { Drawer, IconButton, Menu, MenuItem } from '@mui/material';
import i18next from 'i18next';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { ReactComponent as OraLogo } from '../../../assets/images/ora-logo.svg';
import { lightScheme } from '../../../constants/schemes';
import ThemeContext from '../../../theming/theming';
import Typography from '../../Typography';
import DrawerButton from './DrawerButton';
import useStyles from './styles';

/**
 * This functional component renders the menu button and its options.
 * @returns A button that opens the platform menu.
 */
function MenuButton() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const { selectedTheme, switchTheme } = useContext(ThemeContext);
  const translationMenuOpen = Boolean(anchorEl);
  const availableLanguages = i18next.options.resources;
  const { t } = useTranslation();

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

  const handleOpenTranslationMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseTranslationMenu = () => {
    setAnchorEl(null);
  };

  const handleTranslation = (language) => {
    i18next.changeLanguage(language);
    handleCloseTranslationMenu();
  };

  return (
    <>
      <IconButton
        className={classes.button}
        onClick={() => setOpenDrawer(true)}
      >
        <MenuRoundedIcon className={classes.icon} />
      </IconButton>
      <Drawer
        anchor="right"
        open={openDrawer}
        classes={{ root: classes.list }}
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
      >
        <div className={classes.topContainer}>
          <div className={classes.logoWrapper}>
            <OraLogo alt="ORA" className={classes.logo} />
            <Typography className={classes.caption}>
              {t('general.projectName')}
            </Typography>
          </div>
          <IconButton
            className={classes.button}
            onClick={() => setOpenDrawer(false)}
          >
            <CloseRoundedIcon className={classes.closeIcon} />
          </IconButton>
        </div>
        <div className={classes.items}>
          <DrawerButton
            startIcon={
              selectedTheme === lightScheme ? (
                <DarkModeRoundedIcon style={{ fontSize: 20 }} />
              ) : (
                <LightModeRoundedIcon style={{ fontSize: 20 }} />
              )
            }
            onClick={() => handleSwitchTheme()}
            text="Change theme"
          />
          <DrawerButton
            id="translate-button-drawer"
            startIcon={<TranslateRoundedIcon style={{ fontSize: 20 }} />}
            onClick={handleOpenTranslationMenu}
            text={t('general.language')}
          />
        </div>
      </Drawer>
      <Menu
        id="translate-menu-drawer"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={translationMenuOpen}
        onClose={handleCloseTranslationMenu}
        MenuListProps={{
          style: {
            color: theme.secondary.dark,
          },
        }}
        PaperProps={{
          style: { backgroundColor: theme.background.popup, marginLeft: 27 },
        }}
      >
        {Object.keys(availableLanguages).map((language) => (
          <MenuItem key={language} onClick={() => handleTranslation(language)}>
            <Typography variant="body">
              {availableLanguages[language].translation.general.language}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default MenuButton;
