/* eslint-disable no-unused-vars */
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import MobileNavbarLayout from '../../components/Layout/Mobile/Navbar';
import VLayout from '../../components/Layout/Vertical';
import { breakpoints } from '../../constants/constraints';
import { networkByValue } from '../../constants/options';
import FilteringContext from '../../contexts/filtering';
import api from '../../services/api';
import Filters from './Filters';
import InfoPanel from './InfoPanel';
import MonitoringMap from './MonitoringMap';
import Notifications from './Notifications';
import useStyles from './styles';

/**
 * This component renders a dashboard page
 * @returns dashboard page
 */
function Dashboard() {
  const classes = useStyles();
  const isMobile = useMediaQuery(breakpoints.max.lg);
  const { t } = useTranslation();
  const {
    values: { networkSelection },
  } = useContext(FilteringContext);

  const [lastUpdateDatabase, setLastUpdateDatabase] = useState();

  /**
   * This userEffect fetches last database update timestamp.
   */
  useEffect(() => {
    let isSubscribed = true;
    api.get(`/observation/lastUpdate`).then(({ data }) => {
      if (isSubscribed && data) {
        setLastUpdateDatabase(data.lastUpdate);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  const infoPanel = (
    <InfoPanel
      title={t('specific.infoPanel.title')}
      subtitle={
        lastUpdateDatabase
          ? `${t('specific.infoPanel.lastUpdate')} ${t(
              'general.date.complete',
              {
                date: new Date(lastUpdateDatabase),
              }
            )}`
          : t('specific.infoPanel.loadingLastUpdate')
      }
    />
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
          label: t('specific.mobileNavbar.notifications'),
          icon: <NotificationsNoneRoundedIcon />,
          navContainer: {
            className: classes.notificationsMobileWrapper,
            children: <Notifications />,
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
                    t(networkByValue[networkSelection].translation),
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
            downRow={{
              className: classes.notificationsWrapper,
              children: <Notifications />,
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
