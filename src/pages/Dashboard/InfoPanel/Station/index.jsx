import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import Breadcrumb from '../../../../components/Breadcrumb';
import BarChart from '../../../../components/Charts/Bar';
import LineChart from '../../../../components/Charts/Line';
import Multiple from '../../../../components/Charts/Multiple';
import CustomButton from '../../../../components/CustomButton';
import NavigationContext from '../../../../contexts/navigation';
import api from '../../../../services/api';
import { downloadCSV } from '../../../../utils/helpers';
import CardItem from '../CardList/CardItem';

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

  if (!station) {
    return null;
  }

  const theme = useTheme();
  const { t } = useTranslation();
  const {
    functions: { closeStation },
  } = useContext(NavigationContext);

  const [stationUpdate, setStationUpdate] = useState();
  const [rainData, setRainData] = useState();
  const [levelData, setLevelData] = useState();
  const [flowRateData, setFlowRateData] = useState();
  const [rawData, setRawData] = useState();

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

  const getDatasetObj = (type, y, label, sufix, color, extraProps) => ({
    type,
    label,
    sufix,
    data: y,
    backgroundColor: color,
    borderColor: color,
    borderRadius: 5,
    borderWidth: 1,
    pointRadius: 1.5,
    barThickness: 2,
    ...extraProps,
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
        if (isSubscribed && data) {
          setStationUpdate(data);
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
    if (station.code) {
      api
        .get(`/observation/timeSeries/${station.code}/rain/${timeGrouping}`)
        .then(({ data }) => {
          if (isSubscribed && data?.y) {
            setRainData({
              labels: xAxisFormatter(data.x),
              datasets: [
                getDatasetObj(
                  'bar',
                  data.y,
                  t('specific.dataType.variable.items.rain'),
                  t('specific.dataType.sufixes.rain'),
                  theme.blue.main
                ),
              ],
            });
          }
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [station, timeGrouping]);

  /**
   * This userEffect fetch station level time series.
   */
  useEffect(() => {
    let isSubscribed = true;
    if (station.code) {
      api
        .get(`/observation/timeSeries/${station.code}/level/${timeGrouping}`)
        .then(({ data }) => {
          if (isSubscribed && data?.y) {
            setLevelData({
              labels: xAxisFormatter(data.x),
              datasets: [
                getDatasetObj(
                  'line',
                  data.y,
                  t('specific.dataType.variable.items.adoptedLevel'),
                  t('specific.dataType.sufixes.adoptedLevel'),
                  theme.primary.main
                ),
              ],
            });
          }
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [station, timeGrouping]);

  /**
   * This userEffect fetch station flow rate time series.
   */
  useEffect(() => {
    let isSubscribed = true;
    if (station.code) {
      api
        .get(`/observation/timeSeries/${station.code}/flowRate/${timeGrouping}`)
        .then(({ data }) => {
          if (isSubscribed && data?.y) {
            setFlowRateData({
              labels: xAxisFormatter(data.x),
              datasets: [
                getDatasetObj(
                  'line',
                  data.y,
                  t('specific.dataType.variable.items.flowRate'),
                  t('specific.dataType.sufixes.flowRate'),
                  theme.green.dark
                ),
              ],
            });
          }
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [station, timeGrouping]);

  /**
   * This userEffect fetch station raw data e time series.
   */
  useEffect(() => {
    let isSubscribed = true;
    if (station.code) {
      api
        .get(`/observation/timeSeries/${station.code}/raw/${timeGrouping}`)
        .then(({ data }) => {
          if (isSubscribed && data?.rain) {
            setRawData({
              labels: data.x.map((timestamp) =>
                t('general.date.hour', {
                  date: new Date(timestamp),
                })
              ),
              datasets: [
                getDatasetObj(
                  'line',
                  data.adoptedLevel,
                  t('specific.dataType.variable.items.adoptedLevel'),
                  t('specific.dataType.sufixes.adoptedLevel'),
                  theme.primary.main,
                  {
                    yAxisID: 'y2',
                    borderWidth: 0.5,
                    pointRadius: 1,
                    hidden: true,
                  }
                ),
                getDatasetObj(
                  'line',
                  data.flowRate,
                  t('specific.dataType.variable.items.flowRate'),
                  t('specific.dataType.sufixes.flowRate'),
                  theme.green.dark,
                  {
                    yAxisID: 'y2',
                    borderWidth: 0.5,
                    pointRadius: 1,
                  }
                ),
                getDatasetObj(
                  'bar',
                  data.rain,
                  t('specific.dataType.variable.items.rain'),
                  t('specific.dataType.sufixes.rain'),
                  theme.blue.main,
                  {
                    yAxisID: 'y1',
                    barThickness: 0.5,
                  }
                ),
              ],
            });
          }
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [station, timeGrouping]);

  const csvFetching = (dataType, stationCode) => {
    api
      .get(
        `/observation/timeSeries/${stationCode}/${dataType}/${timeGrouping}`,
        {
          params: {
            format: 'csv',
          },
        }
      )
      .then(({ data }) => {
        downloadCSV(
          data,
          t(`specific.statistics.charts.${dataType}TimeSeries.title`)
        );
      });
  };

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

      <BarChart
        title={t('specific.statistics.charts.rainTimeSeries.title')}
        info={t('specific.statistics.charts.rainTimeSeries.info')}
        data={rainData}
        csvCallback={() => csvFetching('rain', station.code)}
        options={{
          indexAxis: 'x',
          plugins: {
            tooltip: tooltipSufix,
            legend: false,
          },
          scales: {
            y: {
              title: {
                display: true,
                text: t('specific.statistics.charts.rainTimeSeries.yAxisLabel'),
                color: theme.neutral.gray.main,
              },
            },
          },
        }}
      />

      <LineChart
        title={t('specific.statistics.charts.levelTimeSeries.title')}
        info={t('specific.statistics.charts.levelTimeSeries.info')}
        data={levelData}
        csvCallback={() => csvFetching('level', station.code)}
        options={{
          plugins: {
            tooltip: tooltipSufix,
            legend: false,
          },
          scales: {
            y: {
              title: {
                display: true,
                text: t(
                  'specific.statistics.charts.levelTimeSeries.yAxisLabel'
                ),
                color: theme.neutral.gray.main,
              },
            },
          },
        }}
      />

      <LineChart
        title={t('specific.statistics.charts.flowRateTimeSeries.title')}
        info={t('specific.statistics.charts.flowRateTimeSeries.info')}
        data={flowRateData}
        csvCallback={() => csvFetching('flowRate', station.code)}
        options={{
          plugins: {
            tooltip: tooltipSufix,
            legend: false,
          },
          scales: {
            y: {
              title: {
                display: true,
                text: t(
                  'specific.statistics.charts.flowRateTimeSeries.yAxisLabel'
                ),
                color: theme.neutral.gray.main,
              },
            },
          },
        }}
      />

      <Multiple
        title={t('specific.statistics.charts.rawTimeSeries.title')}
        info={t('specific.statistics.charts.rawTimeSeries.info')}
        data={rawData}
        csvCallback={() => csvFetching('raw', station.code)}
        options={{
          plugins: {
            tooltip: tooltipSufix,
            legend: {
              display: true,
              reverse: true,
              borderRadius: 10,
              labels: {
                usePointStyle: true,
                boxWidth: 10,
                borderRadius: 10,
              },
              onClick: (e, legendItem, legend) => {
                const index = legendItem.datasetIndex;
                if (index !== 2) {
                  const ci = legend.chart;
                  if (!ci.isDatasetVisible(index)) {
                    if (index === 1) {
                      ci.hide(0);
                      ci.show(index);
                      ci.options.scales.y2.title.text = t(
                        'specific.statistics.charts.flowRateTimeSeries.yAxisLabel'
                      );
                      ci.update();
                    } else {
                      ci.hide(1);
                      ci.show(index);
                      ci.options.scales.y2.title.text = t(
                        'specific.statistics.charts.levelTimeSeries.yAxisLabel'
                      );
                      ci.update();
                    }
                  }
                }
              },
            },
          },
          scales: {
            y1: {
              reverse: true,
              title: {
                display: true,
                text: t('specific.statistics.charts.rainTimeSeries.yAxisLabel'),
                color: theme.neutral.gray.main,
              },
            },
            y2: {
              title: {
                display: true,
                text: t(
                  'specific.statistics.charts.flowRateTimeSeries.yAxisLabel'
                ),
                color: theme.neutral.gray.main,
              },
            },
          },
        }}
      />

      <li
        style={{
          margin: 15,
        }}
      >
        <CustomButton
          style={{
            width: '100%',
            height: 30,
            backgroundColor: theme.toggleButton.unabled,
            textTransform: 'none',
            color: theme.neutral.gray.main,
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
