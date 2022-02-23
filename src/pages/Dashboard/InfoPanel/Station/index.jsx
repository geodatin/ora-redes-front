/* eslint-disable no-unused-vars */
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

  /**
   * This userEffect updates station data.
   */
  useEffect(() => {
    let isSubscribed = true;
    if (station.code) {
      api
        .post(
          `/observation/list/${timeGrouping}`,
          {},
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
  }, [station.code, timeGrouping]);

  /**
   * This userEffect fetch data chart time series.
   */
  useEffect(() => {
    let isSubscribed = true;

    if (station.code) {
      const dataChartFetches = [
        { dataType: 'rain', dataSetter: setRainData },
        { dataType: 'level', dataSetter: setLevelData },
        { dataType: 'flowRate', dataSetter: setFlowRateData },
        { dataType: 'raw', dataSetter: setRawData },
      ];

      dataChartFetches.forEach(({ dataType, dataSetter }) => {
        api
          .get(
            `/observation/timeSeries/${station.network.toLowerCase()}/${
              station.code
            }/${dataType}/${timeGrouping}`
          )
          .then(({ data }) => {
            if (isSubscribed && data) {
              dataSetter(data);
            }
          });
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, [station, timeGrouping]);

  const csvFetching = (dataType, stationCode) => {
    api
      .get(
        `/observation/timeSeries/${station.network.toLowerCase()}/${stationCode}/${dataType}/${timeGrouping}`,
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

  const customTooltip = {
    callbacks: {
      label(context) {
        return `${context.dataset.label}: ${context.formattedValue} ${context.dataset?.sufix}`;
      },
      title(context) {
        return t('general.date.dayMonthYearHour', {
          date: new Date(context[0]?.label),
        });
      },
    },
  };

  const xTicksByTimeGrouping = {
    callback(value, index, ticks) {
      const timestamp = this.getLabelForValue(value);

      if (timeGrouping === 'year') {
        return t('general.date.year', {
          date: new Date(timestamp),
        });
      }

      if (timeGrouping === 'quarter' || timeGrouping === 'month') {
        return t('general.date.monthYear', {
          date: new Date(timestamp),
        });
      }

      return t('general.date.dayMonthYear', {
        date: new Date(timestamp),
      });
    },
  };

  const [selectedDatasetOnMultiple, setSelectedDatasetOnMultiple] = useState(1);

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
        data={
          rainData && {
            labels: rainData.x,
            datasets: [
              getDatasetObj(
                'bar',
                rainData.y,
                t('specific.dataType.variable.items.rain'),
                t('specific.dataType.sufixes.rain'),
                theme.blue.main
              ),
            ],
          }
        }
        fullScreenEnabled
        csvCallback={() => csvFetching('rain', station.code)}
        options={{
          indexAxis: 'x',
          plugins: {
            tooltip: customTooltip,
            legend: false,
          },
          scales: {
            x: {
              ticks: xTicksByTimeGrouping,
            },
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
        data={
          levelData && {
            labels: levelData.x,
            datasets: [
              getDatasetObj(
                'line',
                levelData.y,
                t('specific.dataType.variable.items.level'),
                t('specific.dataType.sufixes.level'),
                theme.primary.main
              ),
            ],
          }
        }
        fullScreenEnabled
        csvCallback={() => csvFetching('level', station.code)}
        options={{
          plugins: {
            tooltip: customTooltip,
            legend: false,
          },
          scales: {
            x: {
              ticks: xTicksByTimeGrouping,
            },
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
        data={
          flowRateData && {
            labels: flowRateData.x,
            datasets: [
              getDatasetObj(
                'line',
                flowRateData.y,
                t('specific.dataType.variable.items.flowRate'),
                t('specific.dataType.sufixes.flowRate'),
                theme.green.dark
              ),
            ],
          }
        }
        fullScreenEnabled
        csvCallback={() => csvFetching('flowRate', station.code)}
        options={{
          plugins: {
            tooltip: customTooltip,
            legend: false,
          },
          scales: {
            x: {
              ticks: xTicksByTimeGrouping,
            },
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
        data={
          rawData && {
            labels: rawData.x,
            datasets: [
              getDatasetObj(
                'line',
                rawData.level,
                t('specific.dataType.variable.items.level'),
                t('specific.dataType.sufixes.level'),
                theme.primary.main,
                {
                  yAxisID: 'y2',
                  borderWidth: 0.5,
                  pointRadius: 0.5,
                  hidden: true,
                  normalized: true,
                }
              ),
              getDatasetObj(
                'line',
                rawData.flowRate,
                t('specific.dataType.variable.items.flowRate'),
                t('specific.dataType.sufixes.flowRate'),
                theme.green.dark,
                {
                  yAxisID: 'y2',
                  borderWidth: 0.5,
                  pointRadius: 0.5,
                  normalized: true,
                }
              ),
              getDatasetObj(
                'bar',
                rawData.rain,
                t('specific.dataType.variable.items.rain'),
                t('specific.dataType.sufixes.rain'),
                theme.blue.main,
                {
                  yAxisID: 'y1',
                  barThickness: 1,
                }
              ),
            ],
          }
        }
        fullScreenEnabled
        csvCallback={() => csvFetching('raw', station.code)}
        options={{
          showLine: false,
          animation: false,
          plugins: {
            tooltip: customTooltip,
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
                      setSelectedDatasetOnMultiple(index);
                      ci.show(index);
                      ci.update();
                    } else {
                      ci.hide(1);
                      setSelectedDatasetOnMultiple(index);
                      ci.show(index);
                      ci.update();
                    }
                  }
                }
              },
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                callback(value, index, ticks) {
                  const arrayLength = rawData.x.length;
                  const middleIndex = Math.round((arrayLength - 1) / 2);
                  const lastIndex = arrayLength - 1;
                  if (
                    index === 0 ||
                    index === middleIndex ||
                    index === lastIndex
                  ) {
                    return t('general.date.dayMonthYear', {
                      date: new Date(this.getLabelForValue(value)),
                    });
                  }
                  return null;
                },
              },
            },
            y1: {
              ticks: {
                sampleSize: 2,
              },
              reverse: true,
              title: {
                display: true,
                text: t('specific.statistics.charts.rainTimeSeries.yAxisLabel'),
                color: theme.neutral.gray.main,
              },
            },
            y2: {
              ticks: {
                sampleSize: 2,
              },
              title: {
                display: true,
                text:
                  selectedDatasetOnMultiple === 1
                    ? t(
                        'specific.statistics.charts.flowRateTimeSeries.yAxisLabel'
                      )
                    : t(
                        'specific.statistics.charts.levelTimeSeries.yAxisLabel'
                      ),
                color: theme.neutral.gray.main,
              },
            },
          },
        }}
      />

      <li style={{ margin: 15 }}>
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
