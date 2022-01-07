import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { useMediaQuery } from '@mui/material';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';
import HLayout from '../../components/Layout/Horizontal';
import MobileNavbarLayout from '../../components/Layout/Mobile/Navbar';
import VLayout from '../../components/Layout/Vertical';
import MapWrapper from '../../components/MapWrapper';
import { breakpoints } from '../../constants/constraints';
import Statistics from './Statistics';
import useStyles from './styles';

/**
 * This component renders a dashboard page
 * @returns dashboard page
 */
function Dashboard() {
  const classes = useStyles();
  const isMobile = useMediaQuery(breakpoints.max.md);

  return isMobile ? (
    <MobileNavbarLayout
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
            children: <CustomButton>Aplicar</CustomButton>,
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
        {
          label: 'Notifications',
          icon: <NotificationsActiveRoundedIcon />,
          navContainer: {
            className: classes.notificationsMobileWrapper,
            children: <div>Notifications</div>,
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
                <Breadcrumb items={['Monitoramento', 'Todas as redes']} />
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
              children: (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: 5 }}>
                    <CustomButton mini disabled>
                      Aplicar
                    </CustomButton>
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <CustomButton mini>Aplicar</CustomButton>
                  </div>
                  <div>
                    <CustomButton style={{ width: '100%' }}>
                      Aplicar
                    </CustomButton>
                  </div>
                  <div>
                    <CustomCheckbox />
                  </div>
                </div>
              ),
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

export default Dashboard;
