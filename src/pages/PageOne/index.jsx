import React from 'react';

import { layout } from '../../constants/constraints';
import useStyles from './styles';

function PageOne() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {layout.leftColumn.enabled && (
        <div className={classes.leftColumn}>Left column</div>
      )}

      <div className={classes.mainContainer}>Main container</div>

      {layout.rightColumn.enabled && (
        <div className={classes.rightColumn}>Right column</div>
      )}
    </div>
  );
}

export default PageOne;
