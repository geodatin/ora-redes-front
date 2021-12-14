/* eslint-disable no-unused-vars */
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { Button, Menu, MenuItem } from '@mui/material';
import i18next from 'i18next';
import React from 'react';

import Typography from '../Typography';
import useStyles from './styles';

export default function TranslationMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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

  return (
    <div className={classes.wrapper}>
      <Button
        id="translate-button"
        className={classes.button}
        onClick={handleClick}
      >
        <TranslateRoundedIcon />
        <Typography variant="body">Tradução</Typography>
        <KeyboardArrowDownRoundedIcon />
      </Button>
      <Menu
        id="translate-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleTranslation('pt')}>Português</MenuItem>
        <MenuItem onClick={() => handleTranslation('en')}>English</MenuItem>
        <MenuItem onClick={() => handleTranslation('es')}>Español</MenuItem>
      </Menu>
    </div>
  );
}
