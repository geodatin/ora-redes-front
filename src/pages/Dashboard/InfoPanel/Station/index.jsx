import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import Breadcrumb from '../../../../components/Breadcrumb';
import BarChart from '../../../../components/Charts/Bar';
import LineChart from '../../../../components/Charts/Line';
import PanelRoutingContext from '../../../../contexts/panelRouting';
import api from '../../../../services/api';
import CardItem from '../CardList/CardItem';

export default function Station({ station, timeGrouping }) {
  Station.propTypes = {
    station: PropTypes.shape(),
    timeGrouping: PropTypes.string.isRequired,
  };
  Station.defaultProps = {
    station: {},
  };

  if (!station) {
    return null;
  }

  const theme = useTheme();
  const { t } = useTranslation();
  const {
    functions: { closeStation },
  } = useContext(PanelRoutingContext);

  const [stationUpdate, setStationUpdate] = useState(undefined);
  const [rainData, setRainData] = useState();
  const [levelData, setLevelData] = useState();
  const [flowRateData, setFlowRateData] = useState();

  const tooltipSufix = {
    callbacks: {
      label(context) {
        return `${context.dataset.label}: ${context.formattedValue} ${context.dataset?.sufix}`;
      },
    },
  };

  const xAxisFormatter = (timestamps) =>
    timestamps.map((timeStamp) => {
      if (timeGrouping === 'year') {
        return t('general.date.year', {
          date: new Date(timeStamp),
        });
      }

      if (timeGrouping === 'quarter' || timeGrouping === 'month') {
        return t('general.date.monthYear', {
          date: new Date(timeStamp),
        });
      }

      return t('general.date.complete', {
        date: new Date(timeStamp),
      });
    });

  /**
   * This userEffect updates station data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/observation/last/${timeGrouping}`,
        {},
        { params: { stationCode: station.code } }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setStationUpdate(data);
          }
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [station.code, timeGrouping]);

  /**
   * This userEffect fetch station rain time series.
   */
  useEffect(() => {
    let isSubscribed = true;

    api
      .get(`/observation/timeSeries/${station.code}/rain/${timeGrouping}`)
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setRainData({
              labels: xAxisFormatter(data.x),
              datasets: [
                {
                  label: t('specific.dataType.variable.items.rain'),
                  data: data.y,
                  sufix: t('specific.dataType.sufixes.rain'),
                  backgroundColor: [theme.blue.main],
                  borderColor: [theme.blue.main],
                  borderRadius: 5,
                  barThickness: 5,
                },
              ],
            });
          }
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [station, timeGrouping]);

  /**
   * This userEffect fetch station level time series.
   */
  useEffect(() => {
    let isSubscribed = true;

    api
      .get(`/observation/timeSeries/${station.code}/level/${timeGrouping}`)
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setLevelData({
              labels: xAxisFormatter(data.x),
              datasets: [
                {
                  label: t('specific.dataType.variable.items.adoptedLevel'),
                  data: data.y,
                  sufix: t('specific.dataType.sufixes.adoptedLevel'),
                  backgroundColor: [theme.primary.main],
                  borderColor: [theme.primary.main],
                  borderRadius: 5,
                  barThickness: 5,
                },
              ],
            });
          }
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [station, timeGrouping]);

  /**
   * This userEffect fetch station flow rate time series.
   */
  useEffect(() => {
    let isSubscribed = true;

    api
      .get(`/observation/timeSeries/${station.code}/flowRate/${timeGrouping}`)
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setFlowRateData({
              labels: xAxisFormatter(data.x),
              datasets: [
                {
                  label: t('specific.dataType.variable.items.flowRate'),
                  data: data.y,
                  sufix: t('specific.dataType.sufixes.flowRate'),
                  backgroundColor: [theme.green.dark],
                  borderColor: [theme.green.dark],
                  borderRadius: 5,
                  barThickness: 5,
                },
              ],
            });
          }
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [station, timeGrouping]);

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
          onClickItem={({ index }) => index === 0 && closeStation()}
        />
        <IconButton onClick={() => closeStation()} aria-label="back">
          <ArrowBackIosNewRoundedIcon
            style={{ color: theme.secondary.main, fontSize: 17 }}
          />
        </IconButton>
      </li>

      <CardItem
        item={{ ...station, ...stationUpdate }}
        disableMoreStatisticsButton
      />

      <BarChart
        title={t('specific.statistics.charts.rainTimeSeries.title')}
        info={t('specific.statistics.charts.rainTimeSeries.info')}
        data={rainData}
        options={{
          indexAxis: 'x',
          plugins: {
            tooltip: tooltipSufix,
          },
        }}
      />

      <LineChart
        title={t('specific.statistics.charts.levelTimeSeries.title')}
        info={t('specific.statistics.charts.levelTimeSeries.info')}
        data={levelData}
        options={{
          plugins: {
            tooltip: tooltipSufix,
          },
        }}
      />

      <LineChart
        title={t('specific.statistics.charts.flowRateTimeSeries.title')}
        info={t('specific.statistics.charts.flowRateTimeSeries.info')}
        data={flowRateData}
        options={{
          plugins: {
            tooltip: tooltipSufix,
          },
        }}
      />
    </ul>
  );
}
