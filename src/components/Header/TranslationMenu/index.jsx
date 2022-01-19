import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { Button, Menu, MenuItem } from '@mui/material';
import i18next from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import Typography from '../../Typography';
import useStyles from './styles';

/**
 * This component renders a TranslationMenu
 * @returns Translation Menu
 */
export default function TranslationMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const availableLanguages = i18next.options.resources;
  const buttonRef = useRef();
  const [buttonWidth, setButtonWidth] = useState(100);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTranslation = (language) => {
    i18next.changeLanguage(language);
    handleClose();
  };

  /**
   * Select the initial paper width
   */
  useEffect(() => {
    const button = buttonRef.current;
    setButtonWidth(button.offsetWidth);
  }, [buttonRef?.current?.offsetWidth]);

  return (
    <>
      <Button
        ref={buttonRef}
        id="translate-button"
        className={classes.button}
        onClick={handleClick}
      >
        <TranslateRoundedIcon style={{ marginRight: 8, fontSize: 20 }} />
        <Typography variant="body">{t('general.language')}</Typography>
        <KeyboardArrowDownRoundedIcon style={{ marginLeft: 5, fontSize: 20 }} />
      </Button>
      <Menu
        id="translate-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          style: {
            color: theme.secondary.dark,
          },
        }}
        PaperProps={{
          style: {
            backgroundColor: theme.background.popup,
            width: buttonWidth,
          },
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
