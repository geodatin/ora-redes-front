import Tooltip from '@mui/material/Tooltip';
import React from 'react';

import useStyles from './styles';

/**
 * This component renders a custom Tooltip for the application
 * @returns Custom Tooltip
 */
function CustomTooltip(props) {
  const classes = useStyles();

  return (
    <Tooltip
      arrow
      enterTouchDelay={1}
      disableFocusListener
      classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
      {...props}
    />
  );
}

export default CustomTooltip;
