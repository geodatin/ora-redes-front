import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

/**
 * This functional component renders a button to be used on application's menu.
 * @returns A Drawer button.
 */
function DrawerButton({ id, onClick, text, startIcon }) {
  const classes = useStyles();

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
};

DrawerButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  startIcon: PropTypes.shape(),
  id: PropTypes.string,
};

export default DrawerButton;
