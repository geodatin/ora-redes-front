/* eslint-disable no-unused-vars */
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import Breadcrumb from '../../../../components/Breadcrumb';
import CustomButton from '../../../../components/CustomButton';
import FilteringContext from '../../../../contexts/filtering';
import NavigationContext from '../../../../contexts/navigation';
import api from '../../../../services/api';
import { CardItem } from '../CardList/CardItem';
import HYBAMTimeSeries from './TimeSeries/HYBAM';
import RHATimeSeries from './TimeSeries/RHA';
import RQATimeSeries from './TimeSeries/RQA';

/**
 * This function provides a station panel
 * @returns station panel
 */
export default function Station({ station, timeGrouping, tabpanelref }) {
  Station.propTypes = {
    station: PropTypes.shape(),
    timeGrouping: PropTypes.string.isRequired,
    tabpanelref: PropTypes.shape(),
  };

  Station.defaultProps = {
    station: {},
    tabpanelref: undefined,
  };

  const theme = useTheme();
  const { t } = useTranslation();

  const {
    functions: { closeStation },
  } = useContext(NavigationContext);

  const {
    values: { filters },
  } = useContext(FilteringContext);

  const [stationUpdate, setStationUpdate] = useState();

  /**
   * This userEffect updates station data.
   */
  useEffect(() => {
    let isSubscribed = true;
    if (station.code) {
      api
        .post(
          `/observation/list/${timeGrouping}`,
          { filters: { ...filters, network: [station.network] } },
          { params: { stationCode: station.code } }
        )
        .then(({ data }) => {
          if (isSubscribed && data) {
            setStationUpdate(data);
          }
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [station.code, station.network, timeGrouping]);

  function getTimeSeries(network) {
    if (network === 'RHA') {
      return <RHATimeSeries station={station} timeGrouping={timeGrouping} />;
    }
    if (network === 'RQA') {
      return <RQATimeSeries station={station} />;
    }
    if (network === 'HYBAM') {
      return <HYBAMTimeSeries station={station} />;
    }
    return <> </>;
  }

  return (
    <ul>
      <li
        style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          margin: '15px 15px 0px 15px',
          alignItems: 'center',
        }}
      >
        <Breadcrumb
          items={[t('specific.dataType.station.plural'), station?.name ?? '']}
          onClickItem={({ index }) => index === 0 && closeStation(tabpanelref)}
        />
        <IconButton onClick={() => closeStation(tabpanelref)} aria-label="back">
          <ArrowBackIosNewRoundedIcon
            style={{ color: theme.secondary.main, fontSize: 17 }}
          />
        </IconButton>
      </li>

      <CardItem
        item={{ ...station, ...stationUpdate }}
        disableMoreStatisticsButton
      />

      {getTimeSeries(station.network)}

      <li style={{ margin: 15 }}>
        <CustomButton
          style={{
            width: '100%',
            height: 30,
            backgroundColor: theme.toggleButton.unabled,
            textTransform: 'none',
            color: theme.secondary.dark,
          }}
          disabled={false}
          onClick={() => closeStation(tabpanelref)}
        >
          {t('specific.list.seeMoreStations')}
        </CustomButton>
      </li>
    </ul>
  );
}
