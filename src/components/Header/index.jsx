import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '../Typography';
import HeaderButton from './HeaderButton';
import useStyles from './styles';
import ThemeButton from './ThemeButton';
import TranslationMenu from './TranslationMenu';

/**
 * This component renders a Header
 * @returns Application's header
 */
export default function Header({ items }) {
  Header.defaultProps = {
    items: [],
  };

  Header.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape()),
  };

  const classes = useStyles();

  return (
    <header className={classes.container}>
      <Link className={classes.logoContainer} to="/">
        <div className={classes.logoDetail} />
        <Typography variant="caption">REDES</Typography>
      </Link>
      <div className={classes.menuItems}>
        <div className={classes.initialItems}>
          {items &&
            items.map((item) => (
              <HeaderButton title={item.title} to={item.to} />
            ))}
        </div>
        <div className={classes.endItems}>
          <TranslationMenu />
          <span className={classes.separator} />
          <ThemeButton />
        </div>
      </div>
    </header>
  );
}
