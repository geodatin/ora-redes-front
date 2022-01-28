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
              labels: data.x.map((timeStamp) =>
                t('general.date.complete', {
                  date: new Date(timeStamp),
                })
              ),
              datasets: [
                {
                  label: t('specific.dataType.variable.items.rain'),
                  data: data.y,
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
              labels: data.x.map((timeStamp) =>
                t('general.date.complete', {
                  date: new Date(timeStamp),
                })
              ),
              datasets: [
                {
                  label: t('specific.dataType.variable.items.adoptedLevel'),
                  data: data.y,
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
              labels: data.x.map((timeStamp) =>
                t('general.date.complete', {
                  date: new Date(timeStamp),
                })
              ),
              datasets: [
                {
                  label: t('specific.dataType.variable.items.flowRate'),
                  data: data.y,
                  backgroundColor: [theme.green.main],
                  borderColor: [theme.green.main],
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
          items={[t('specific.infoPanel.list'), station?.name ?? '']}
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
        options={{ indexAxis: 'x' }}
      />

      <LineChart
        title={t('specific.statistics.charts.levelTimeSeries.title')}
        info={t('specific.statistics.charts.levelTimeSeries.info')}
        data={levelData}
      />

      <LineChart
        title={t('specific.statistics.charts.flowRateTimeSeries.title')}
        info={t('specific.statistics.charts.flowRateTimeSeries.info')}
        data={flowRateData}
      />
    </ul>
  );
}
