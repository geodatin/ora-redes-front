import React from 'react';

import Layout from '../../components/Layout';
import useStyles from './styles';

/**
 * This component renders a page
 * @returns page one
 */
function PageOne() {
  const classes = useStyles();

  return (
    <Layout
      leftColumn={{
        className: classes.notifications,
        children: <div>Notifications</div>,
      }}
      mainContainer={{
        className: classes.map,
        children: <div>Map</div>,
      }}
      rightColumn={{
        className: classes.statistics,
        children: <div>Statistics</div>,
      }}
    />
  );
}

export default PageOne;
