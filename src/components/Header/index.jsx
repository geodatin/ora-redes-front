import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ReactComponent as OraLogo } from '../../assets/images/ora-logo.svg';
import Typography from '../Typography';
import HeaderButton from './HeaderButton';
import MenuButton from './MenuButton';
import useStyles from './styles';
import ThemeButton from './ThemeButton';
import TranslationMenu from './TranslationMenu';

/**
 * This component renders a Header
 * @returns Application's header
 */
export default function Header({ items }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <header className={classes.container}>
      <Link className={classes.logoContainer} to="/">
        <div className={classes.logoDetail} />
        <div className={classes.logoWrapper}>
          <OraLogo alt="ORA" className={classes.logo} />
          <Typography className={classes.caption}>
            {t('general.projectName')}
          </Typography>
        </div>
      </Link>
      <div className={classes.menuItems}>
        <div className={classes.initialItems}>
          <div className={classes.buttonWrapper}>
            {items.map((item) => (
              <HeaderButton key={item.to} title={item.title} to={item.to} />
            ))}
          </div>
        </div>
        <div className={classes.endItems}>
          <div className={classes.buttonWrapper}>
            <TranslationMenu />
            <span className={classes.separator} />
            <ThemeButton />
          </div>
          <div className={classes.menuButton}>
            <MenuButton items={items} />
          </div>
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  items: [],
};

Header.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
};
