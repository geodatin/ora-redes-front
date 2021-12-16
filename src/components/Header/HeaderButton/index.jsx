import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

/**
 * This component renders a HeaderButton
 * @returns Header Button
 */
export default function HeaderButton({ onClick, actived, title }) {
  HeaderButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    actived: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  };

  const classes = useStyles();

  return (
    <Button
      id="header-button-title"
      className={actived ? classes.activedButton : classes.button}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
