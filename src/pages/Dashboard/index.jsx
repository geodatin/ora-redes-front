import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { useMediaQuery } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import MobileNavbarLayout from '../../components/Layout/Mobile/Navbar';
import VLayout from '../../components/Layout/Vertical';
import { breakpoints } from '../../constants/constraints';
import { PanelRoutingProvider } from '../../contexts/panelRouting';
import Filters from './Filters';
import InfoPanel from './InfoPanel';
import MonitoringMap from './MonitoringMap';
import useStyles from './styles';

/**
 * This component renders a dashboard page
 * @returns dashboard page
 */
function Dashboard() {
  const classes = useStyles();
  const isMobile = useMediaQuery(breakpoints.max.lg);
  const { t } = useTranslation();

  const infoPanel = (
    <PanelRoutingProvider>
      <InfoPanel
        title={t('specific.infoPanel.title')}
        subtitle="Last update in 11/08/2022"
      />
    </PanelRoutingProvider>
  );

  return isMobile ? (
    <MobileNavbarLayout
      mainContainer={{
        label: t('specific.mobileNavbar.map'),
        icon: <MapRoundedIcon />,
        children: <MonitoringMap />,
      }}
      bottomNavBar={[
        {
          label: t('specific.mobileNavbar.filters'),
          icon: <ManageSearchRoundedIcon />,
          navContainer: {
            className: classes.filtersMobileWrapper,
            children: <Filters />,
          },
        },
        {
          label: t('specific.mobileNavbar.panel'),
          icon: <AutoGraphRoundedIcon />,
          navContainer: {
            className: classes.infoPanelMobileWrapper,
            children: infoPanel,
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
                <Breadcrumb
                  items={[
                    t('specific.breadcrumbs.monitoring'),
                    t('specific.breadcrumbs.allNetworks'),
                  ]}
                  onClickItem={() => {}}
                />
              ),
            }}
            mainContainer={{
              className: classes.map,
              children: <MonitoringMap />,
            }}
          />
        ),
      }}
      leftColumn={{
        className: classes.filtersNotificationsWrapper,
        children: (
          <VLayout
            mainContainer={{
              className: classes.filtersWrapper,
              children: <Filters />,
            }}
          />
        ),
      }}
      rightColumn={{
        className: classes.infoPanelWrapper,
        children: infoPanel,
      }}
    />
  );
}

export default Dashboard;
