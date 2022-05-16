import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import ChartSkeleton from '../../../../../components/ChartContainer/ChartSkeleton';
import BarChart from '../../../../../components/Charts/Bar';
import LineChart from '../../../../../components/Charts/Line';
import Multiple from '../../../../../components/Charts/Multiple';
import { dataTypes, networks } from '../../../../../constants/options';
import api from '../../../../../services/api';
import { downloadCSV, getYLineAnnotation } from '../../../../../utils/helpers';

/**
 * This component provides station chart time series
 * @returns TimeSeriesCharts
 */
export default function TimeSeriesCharts({ station, timeGrouping }) {
  TimeSeriesCharts.propTypes = {
    station: PropTypes.shape().isRequired,
    timeGrouping: PropTypes.string.isRequired,
  };

  if (Object.keys(station).length === 0) {
    return null;
  }

  const theme = useTheme();
  const { t } = useTranslation();

  const [selectedDatasetOnMultiple, setSelectedDatasetOnMultiple] = useState(1);
  const [availableCharts, setAvailableCharts] = useState([]);

  useEffect(() => {
    setAvailableCharts(
      networks[station.network].charts.map((chart) => ({
        ...chart,
        isLoaded: false,
      }))
    );
    setSelectedDatasetOnMultiple(1);
  }, [station, timeGrouping]);

  /**
   * This userEffect fetch data chart time series.
   */
  useEffect(() => {
    let isSubscribed = true;
    if (station.code) {
      networks[station.network].charts.forEach(
        ({ dataType, enableTimeGrouping }) => {
          api
            .get(
              `/observation/timeSeries/${station.network.toLowerCase()}/${
                station.code
              }/${dataType}/${enableTimeGrouping ? timeGrouping : 'year'}`
            )
            .then(({ data }) => {
              if (isSubscribed && data) {
                const hasDataOnY = data?.y?.some((y) => y !== null);
                setAvailableCharts((prev) => {
                  const newAvailableCharts = [...prev];
                  const chart = newAvailableCharts.find(
                    (c) => c.dataType === dataType
                  );
                  if (chart) {
                    chart.data = data;
                    chart.isLoaded = true;
                    chart.isEmpty = dataType === 'raw' ? false : !hasDataOnY;
                  }

                  return newAvailableCharts;
                });
              }
            })
            .catch(() => {
              setAvailableCharts((prev) => {
                const newAvailableCharts = [...prev];
                const chart = newAvailableCharts.find(
                  (c) => c.dataType === dataType
                );
                if (chart) {
                  chart.isLoaded = false;
                  chart.isEmpty = true;
                }
                return newAvailableCharts;
              });
            });
        }
      );
    }

    return () => {
      isSubscribed = false;
    };
  }, [station, timeGrouping]);

  const csvFetching = (dataType, stationCode, enableTimeGrouping) => {
    api
      .get(
        `/observation/timeSeries/${station.network.toLowerCase()}/${stationCode}/${dataType}/${
          enableTimeGrouping ? timeGrouping : 'year'
        }`,
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

  const xTicksDefault = {
    callback(value) {
      const timestamp = this.getLabelForValue(value);

      return t('general.date.dayMonthYear', {
        date: new Date(timestamp),
      });
    },
  };

  const xTicksByTimeGrouping = {
    callback(value) {
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

  const getLimits = (dataType, data, yScaleID) => ({
    line1: () => {
      const superiorLimit = data?.limits?.[dataType]?.superiorLimit;
      if (superiorLimit) {
        return getYLineAnnotation({
          y: superiorLimit,
          color: 'green',
          bgColor: theme.background.main,
          label: ` ${t(
            `specific.statistics.charts.timeSeries.${dataType}.superiorLimit`
          )} `,
          yScaleID,
          display: true,
        });
      }
      return { display: false };
    },
    line2: () => {
      const inferiorLimit = data?.limits?.[dataType]?.inferiorLimit;
      if (inferiorLimit) {
        return getYLineAnnotation({
          y: inferiorLimit,
          color: 'red',
          bgColor: theme.background.main,
          label: ` ${t(
            `specific.statistics.charts.timeSeries.${dataType}.inferiorLimit`
          )} `,
          yScaleID,
          display: true,
        });
      }
      return { display: false };
    },
  });

  return availableCharts.map((chart) => {
    if (chart.isEmpty) return null;

    if (!chart.isLoaded) {
      return (
        <div key={chart.dataType} style={{ padding: 15, marginBottom: 10 }}>
          <ChartSkeleton />
        </div>
      );
    }

    if (chart.type === 'line') {
      return (
        <LineChart
          key={chart.dataType}
          title={t(
            `specific.statistics.charts.timeSeries.${chart.dataType}.title`
          )}
          info={t(
            `specific.statistics.charts.timeSeries.${chart.dataType}.info`
          )}
          data={
            chart.data && {
              labels: chart.data.x,
              datasets: [
                getDatasetObj(
                  'line',
                  chart.data.y,
                  t(`specific.dataType.variable.items.${chart.dataType}`),
                  t(`specific.dataType.sufixes.${chart.dataType}`),
                  dataTypes.variable?.colors[chart.dataType]
                ),
              ],
            }
          }
          fullScreenEnabled
          csvCallback={() =>
            csvFetching(chart.dataType, station.code, chart.enableTimeGrouping)
          }
          options={{
            plugins: {
              tooltip: customTooltip,
              legend: false,
              autocolors: false,
              annotation: {
                annotations: getLimits(chart.dataType, chart.data),
              },
            },
            scales: {
              x: {
                ticks: chart.enableTimeGrouping
                  ? xTicksByTimeGrouping
                  : xTicksDefault,
              },
              y: {
                title: {
                  display: true,
                  text: t(
                    `specific.statistics.charts.timeSeries.${chart.dataType}.yAxisLabel`
                  ),
                  color: theme.neutral.gray.main,
                },
              },
            },
          }}
        />
      );
    }
    if (chart.type === 'bar') {
      return (
        <BarChart
          key={chart.dataType}
          title={t(
            `specific.statistics.charts.timeSeries.${chart.dataType}.title`
          )}
          info={t(
            `specific.statistics.charts.timeSeries.${chart.dataType}.info`
          )}
          data={
            chart.data && {
              labels: chart.data.x,
              datasets: [
                getDatasetObj(
                  'bar',
                  chart.data.y,
                  t(`specific.dataType.variable.items.${chart.dataType}`),
                  t(`specific.dataType.sufixes.${chart.dataType}`),
                  dataTypes.variable?.colors[chart.dataType]
                ),
              ],
            }
          }
          fullScreenEnabled
          csvCallback={() =>
            csvFetching(chart.dataType, station.code, chart.enableTimeGrouping)
          }
          options={{
            indexAxis: 'x',
            plugins: {
              tooltip: customTooltip,
              legend: false,
            },
            scales: {
              x: {
                ticks: chart.enableTimeGrouping
                  ? xTicksByTimeGrouping
                  : xTicksDefault,
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
      );
    }
    if (chart.type === 'multiple') {
      return (
        <Multiple
          key={chart.dataType}
          title={t(
            `specific.statistics.charts.timeSeries.${chart.dataType}.title`
          )}
          info={t(
            `specific.statistics.charts.timeSeries.${chart.dataType}.info`
          )}
          data={
            chart.data && {
              labels: chart.data.x,
              datasets: [
                getDatasetObj(
                  'line',
                  chart.data.level,
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
                  chart.data.flowRate,
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
                  chart.data.rain,
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
          csvCallback={() =>
            csvFetching(chart.dataType, station.code, chart.enableTimeGrouping)
          }
          options={{
            showLine: false,
            animation: false,
            plugins: {
              tooltip: customTooltip,
              autocolors: false,
              annotation: {
                annotations: getLimits(
                  selectedDatasetOnMultiple === 1 ? 'flowRate' : 'level',
                  chart.data,
                  'y2'
                ),
              },
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
                  callback(value, index) {
                    const arrayLength = chart.data.x.length;
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
      );
    }
    return null;
  });
}
