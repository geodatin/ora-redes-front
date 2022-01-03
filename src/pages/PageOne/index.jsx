import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import VLayout from '../../components/Layout/Vertical';
import MapWrapper from '../../components/MapWrapper';
import Statistics from './Statistics';
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
        className: classes.filtersNotificationsWrapper,
        children: (
          <VLayout
            upRow={{
              className: classes.filtersWrapper,
              children: <div>Filters</div>,
            }}
            mainContainer={{
              className: classes.notificationsWrapper,
              children: <div>Notifications</div>,
            }}
          />
        ),
      }}
      mainContainer={{
        className: classes.breadMapWrapper,
        children: (
          <VLayout
            upRow={{
              className: classes.breadBarWrapper,
              children: (
                <div className={classes.breadcrumbWrapper}>
                  <Breadcrumb items={['Monitoramento', 'Todas as redes']} />
                </div>
              ),
            }}
            mainContainer={{
              className: classes.map,
              children: <MapWrapper />,
            }}
          />
        ),
      }}
      rightColumn={{
        className: classes.statisticsWrapper,
        children: <Statistics />,
      }}
    />
  );
}

export default PageOne;
