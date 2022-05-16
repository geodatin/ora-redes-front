import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import useStyles from './styles';

/**
 * This component encapsulates and alternate tab content.
 */
export default function TabPanel({ children, value, index }) {
  TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const tabpanelref = useRef();
  const classes = useStyles();

  return (
    <div
      ref={tabpanelref}
      className={classes.wrapper}
      role="tabpanel"
      style={
        value === index
          ? { opacity: 1 }
          : {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            }
      }
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {React.cloneElement(children, { tabpanelref })}
    </div>
  );
}
