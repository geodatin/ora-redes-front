import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import useStyles from './styles';

/**
 * This component renders a custom map item component
 * @returns Map Item component
 */
export default function MapItem({ children, popupContent, onClick }) {
  const classes = useStyles();
  const [open, setOpen] = useState();

  return (
    <div className={classes.container}>
      <Button
        onClick={() => {
          setOpen((o) => !o);
          onClick();
        }}
        className={classes.button}
      >
        {children}
      </Button>
      {open && popupContent && (
        <div className={classes.popup}>{popupContent}</div>
      )}
    </div>
  );
}

MapItem.defaultProps = {
  popupContent: undefined,
  onClick: () => {},
};

MapItem.propTypes = {
  children: PropTypes.shape().isRequired,
  popupContent: PropTypes.shape(),
  onClick: PropTypes.func,
};
