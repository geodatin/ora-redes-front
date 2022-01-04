import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { useMediaQuery } from '@mui/material';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import MobileLayout from '../../components/Layout/Mobile';
import VLayout from '../../components/Layout/Vertical';
import MapWrapper from '../../components/MapWrapper';
import { breakpoints } from '../../constants/constraints';
import Statistics from './Statistics';
import useStyles from './styles';

/**
 * This component renders a page
 * @returns page one
 */
function PageOne() {
  const classes = useStyles();
  const isMobile = useMediaQuery(breakpoints.max.smd);

  return isMobile ? (
    <MobileLayout
      mainContainer={{
        label: 'Map',
        icon: <MapRoundedIcon />,
        children: <MapWrapper />,
      }}
      bottomNavBar={[
        {
          label: 'Filters',
          icon: <ManageSearchRoundedIcon />,
          navContainer: {
            className: classes.filtersMobileWrapper,
            children: <div>Filters</div>,
          },
        },
        {
          label: 'Statistics',
          icon: <AutoGraphRoundedIcon />,
          navContainer: {
            className: classes.statisticsMobileWrapper,
            children: <Statistics />,
          },
        },
      ]}
    />
  ) : (
    <HLayout
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
      rightColumn={{
        className: classes.statisticsWrapper,
        children: <Statistics />,
      }}
    />
  );
}

export default PageOne;
