import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import MobileNavbarLayout from '../../components/Layout/Mobile/Navbar';
import VLayout from '../../components/Layout/Vertical';
import { layoutConfigs, networkByValue } from '../../constants/options';
import FilteringContext from '../../contexts/filtering';
import { useLayoutConfig } from '../../hooks/useLayoutConfig';
import { useMobile } from '../../hooks/useMobile';
import { useQuery } from '../../hooks/useQuery';
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
  const { t } = useTranslation();

  const [lastUpdateDatabase, setLastUpdateDatabase] = useState();

  const {
    values: { networkSelection, embed },
  } = useContext(FilteringContext);

  const { layoutConfig, setLayoutConfig } = useLayoutConfig();
  const { isMobile, mobileNavValue, setMobileNavValue } = useMobile();

  const query = useQuery();
  const [mainTopSection, setMainTopSection] = useState(true);

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
      title={t(networkByValue[networkSelection].translation)}
      subtitle={
        lastUpdateDatabase
          ? `${t('specific.infoPanel.lastUpdate')} ${t(
              'general.date.dayMonthYearHour',
              {
                date: new Date(lastUpdateDatabase),
              }
            )}`
          : t('specific.infoPanel.loadingLastUpdate')
      }
    />
  );

  useEffect(() => {
    if (embed) {
      const leftBar = query.get('leftBar') === 'true';
      const rightBar = query.get('rightBar') === 'true';
      const topBar = query.get('topBar') === 'true';

      if (leftBar && rightBar) {
        setLayoutConfig(0);
      } else if (rightBar) {
        setLayoutConfig(1);
      } else if (leftBar) {
        setLayoutConfig(3);
      } else {
        setLayoutConfig(2);
      }

      setMainTopSection(topBar);
    }
  }, [embed]);

  return isMobile ? (
    <MobileNavbarLayout
      value={mobileNavValue}
      setValue={setMobileNavValue}
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
            upRow={
              mainTopSection
                ? {
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
                  }
                : undefined
            }
            mainContainer={{
              className: classes.map,
              children: <MonitoringMap />,
            }}
          />
        ),
      }}
      leftColumn={{
        isHidden: layoutConfigs.isLeftHidden[layoutConfig],
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
        isHidden: layoutConfigs.isRightHidden[layoutConfig],
        className: classes.infoPanelWrapper,
        children: infoPanel,
      }}
    />
  );
}

export default Dashboard;
