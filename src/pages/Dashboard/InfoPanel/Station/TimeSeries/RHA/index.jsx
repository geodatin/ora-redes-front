/* eslint-disable no-unused-vars */
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import BarChart from '../../../../../../components/Charts/Bar';
import LineChart from '../../../../../../components/Charts/Line';
import Multiple from '../../../../../../components/Charts/Multiple';
import api from '../../../../../../services/api';
import { downloadCSV } from '../../../../../../utils/helpers';

/**
 * This function provides time series of RHA network
 * @returns RHATimeSeries
 */
export default function RHATimeSeries({ station, timeGrouping }) {
  RHATimeSeries.propTypes = {
    station: PropTypes.shape(),
    timeGrouping: PropTypes.string.isRequired,
  };

  RHATimeSeries.defaultProps = {
    station: {},
  };

  const theme = useTheme();
  const { t } = useTranslation();

  const [rainData, setRainData] = useState();
  const [levelData, setLevelData] = useState();
  const [flowRateData, setFlowRateData] = useState();

  const [selectedDatasetOnMultiple, setSelectedDatasetOnMultiple] = useState(1);
  const [rawData, setRawData] = useState();

  const chartFetches = [
    { dataType: 'rain', dataSetter: setRainData },
    { dataType: 'level', dataSetter: setLevelData },
    { dataType: 'flowRate', dataSetter: setFlowRateData },
    { dataType: 'raw', dataSetter: setRawData },
  ];

  /**
   * This userEffect fetch data chart time series.
   */
  useEffect(() => {
    let isSubscribed = true;

    if (station.code) {
      chartFetches.forEach(({ dataType, dataSetter }) => {
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
          t(`specific.statistics.charts.timeSeries.${dataType}.title`)
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

  return (
    <>
      <BarChart
        title={t('specific.statistics.charts.timeSeries.rain.title')}
        info={t('specific.statistics.charts.timeSeries.rain.info')}
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
                text: t(
                  'specific.statistics.charts.timeSeries.rain.yAxisLabel'
                ),
                color: theme.neutral.gray.main,
              },
            },
          },
        }}
      />

      <LineChart
        title={t('specific.statistics.charts.timeSeries.level.title')}
        info={t('specific.statistics.charts.timeSeries.level.info')}
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
                  'specific.statistics.charts.timeSeries.level.yAxisLabel'
                ),
                color: theme.neutral.gray.main,
              },
            },
          },
        }}
      />

      <LineChart
        title={t('specific.statistics.charts.timeSeries.flowRate.title')}
        info={t('specific.statistics.charts.timeSeries.flowRate.info')}
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
                  'specific.statistics.charts.timeSeries.flowRate.yAxisLabel'
                ),
                color: theme.neutral.gray.main,
              },
            },
          },
        }}
      />

      <Multiple
        title={t('specific.statistics.charts.timeSeries.raw.title')}
        info={t('specific.statistics.charts.timeSeries.raw.info')}
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
                  hidden: selectedDatasetOnMultiple !== 0,
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
                text: t(
                  'specific.statistics.charts.timeSeries.rain.yAxisLabel'
                ),
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
                        'specific.statistics.charts.timeSeries.flowRate.yAxisLabel'
                      )
                    : t(
                        'specific.statistics.charts.timeSeries.level.yAxisLabel'
                      ),
                color: theme.neutral.gray.main,
              },
            },
          },
        }}
      />
    </>
  );
}
