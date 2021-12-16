import { Button, Link } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

/**
 * This component renders a HeaderButton
 * @returns Header Button
 */
export default function HeaderButton({ to, actived, title }) {
  HeaderButton.propTypes = {
    to: PropTypes.func.isRequired,
    actived: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  };

  const classes = useStyles();

  return (
    <Link to={to}>
      <Button
        id="header-button-title"
        className={actived ? classes.activedButton : classes.button}
      >
        {title}
      </Button>
    </Link>
  );
}
