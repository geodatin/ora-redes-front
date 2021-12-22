import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles';

/**
 * This functional component renders a button to be used on application's menu.
 * @returns A Drawer button.
 */
function DrawerButton({ id, onClick, text, startIcon, to }) {
  const classes = useStyles();
  const { pathname } = useLocation();

  const actived = useMemo(() => {
    const path1 = pathname.substring(1);
    const path2 = pathname.substring(0, path1.indexOf('/') + 1);

    if (path2) {
      return path2 === to;
    }

    return pathname === to;
  }, [pathname]);

  if (to) {
    return (
      <Link to={to} className={classes.link}>
        <Button
          id={id}
          startIcon={startIcon}
          className={actived ? classes.activedButton : classes.button}
          onClick={onClick}
        >
          {text}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      id={id}
      startIcon={startIcon}
      className={classes.button}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

DrawerButton.defaultProps = {
  onClick: () => {},
  startIcon: undefined,
  id: undefined,
  to: undefined,
};

DrawerButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  startIcon: PropTypes.shape(),
  id: PropTypes.string,
  to: PropTypes.string,
};

export default DrawerButton;
