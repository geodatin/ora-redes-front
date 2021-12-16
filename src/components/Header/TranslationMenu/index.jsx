import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { Button, Menu, MenuItem } from '@mui/material';
import i18next from 'i18next';
import React from 'react';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

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
    <>
      <Button
        id="translate-button"
        className={classes.button}
        onClick={handleClick}
      >
        <TranslateRoundedIcon style={{ marginRight: 8, fontSize: 20 }} />
        <Typography variant="body">
          {t(i18next.language.toLowerCase())}
        </Typography>
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
          style: { backgroundColor: theme.background.popup },
        }}
      >
        <MenuItem onClick={() => handleTranslation('pt')}>
          <Typography variant="body">{t('pt')}</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleTranslation('en')}>
          <Typography variant="body">{t('en')}</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleTranslation('es')}>
          <Typography variant="body">{t('es')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
