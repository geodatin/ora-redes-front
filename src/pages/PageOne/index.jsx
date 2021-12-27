import React from 'react';

import HLayout from '../../components/Layout/Horizontal';
import VLayout from '../../components/Layout/Vertical';
import MapWrapper from '../../components/MapWrapper';
import useStyles from './styles';

/**
 * This component renders a page
 * @returns page one
 */
function PageOne() {
  const classes = useStyles();

  return (
    <HLayout
      leftColumn={{
        className: classes.leftWrapper,
        children: (
          <VLayout
            upRow={{
              className: classes.filters,
              children: <div>Filters</div>,
            }}
            mainContainer={{
              className: classes.notifications,
              children: <div>Notifications</div>,
            }}
          />
        ),
      }}
      mainContainer={{
        className: classes.mainWrapper,
        children: (
          <VLayout
            upRow={{
              className: classes.mapBar,
              children: <div>MapBar</div>,
            }}
            mainContainer={{
              className: classes.map,
              children: <MapWrapper />,
            }}
          />
        ),
      }}
      rightColumn={{
        className: classes.statistics,
        children: <div>Statistics</div>,
      }}
    />
  );
}

export default PageOne;
