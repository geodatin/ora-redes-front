/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import LineChart from '../../../../../../components/Charts/Line';
import Multiple from '../../../../../../components/Charts/Multiple';
import { dataTypes } from '../../../../../../constants/options';
import api from '../../../../../../services/api';
import {
  downloadCSV,
  getYLineAnnotation,
} from '../../../../../../utils/helpers';

/**
 * This function provides time series of HYBAM network
 * @returns HYBAMTimeSeries
 */
export default function HYBAMTimeSeries({ station }) {
  HYBAMTimeSeries.propTypes = {
    station: PropTypes.shape(),
  };

  HYBAMTimeSeries.defaultProps = {
    station: {},
  };

  const theme = useTheme();
  const { t } = useTranslation();

  const [levelData, setLevelData] = useState();
  const [flowRateData, setFlowRateData] = useState();
  const [phData, setPhData] = useState();
  const [electricConductivityData, setElectricConductivityData] = useState();
  const [sampleTemperatureData, setSampleTemperatureData] = useState();
  const [totalOrtophosphateData, setTotalOrtophosphateData] = useState();

  const chartFetches = [
    { dataType: 'level', dataSetter: setLevelData },
    { dataType: 'flowRate', dataSetter: setFlowRateData },
    { dataType: 'ph', dataSetter: setPhData },
    {
      dataType: 'electricConductivity',
      dataSetter: setElectricConductivityData,
    },
    { dataType: 'sampleTemperature', dataSetter: setSampleTemperatureData },
    { dataType: 'totalOrtophosphate', dataSetter: setTotalOrtophosphateData },
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
            }/${dataType}/hour`
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
  }, [station]);

  const csvFetching = (dataType, stationCode) => {
    api
      .get(
        `/observation/timeSeries/${station.network.toLowerCase()}/${stationCode}/${dataType}/hour`,
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

      return t('general.date.dayMonthYear', {
        date: new Date(timestamp),
      });
    },
  };

  const getLimits = (data) => ({
    line1: () => {
      const superiorLimit = data?.limits?.superiorLimit;
      if (superiorLimit) {
        return getYLineAnnotation({
          y: superiorLimit,
          color: 'green',
          bgColor: theme.background.main,
          label: 'max',
          display: true,
        });
      }
      return { display: false };
    },
    line2: () => {
      const inferiorLimit = data?.limits?.inferiorLimit;
      if (inferiorLimit) {
        return getYLineAnnotation({
          y: inferiorLimit,
          color: 'red',
          bgColor: theme.background.main,
          label: 'min',
          display: true,
        });
      }
      return { display: false };
    },
  });

  const getLineChart = (data, dataType) => {
    const hasDataOnY = data?.y?.some((y) => y !== null);

    if (hasDataOnY) {
      return (
        <LineChart
          title={t(`specific.statistics.charts.timeSeries.${dataType}.title`)}
          info={t(`specific.statistics.charts.timeSeries.${dataType}.info`)}
          data={
            data && {
              labels: data.x,
              datasets: [
                getDatasetObj(
                  'line',
                  data.y,
                  t(`specific.dataType.variable.items.${dataType}`),
                  t(`specific.dataType.sufixes.${dataType}`),
                  dataTypes.variable?.colors[dataType]
                ),
              ],
            }
          }
          fullScreenEnabled
          csvCallback={() => csvFetching(dataType, station.code)}
          options={{
            plugins: {
              tooltip: customTooltip,
              legend: false,
              annotation: {
                annotations: getLimits(data),
              },
            },
            scales: {
              x: {
                ticks: xTicksByTimeGrouping,
              },
              y: {
                title: {
                  display: true,
                  text: t(
                    `specific.statistics.charts.timeSeries.${dataType}.yAxisLabel`
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
  };

  return (
    <>
      {getLineChart(flowRateData, 'flowRate')}
      {getLineChart(levelData, 'level')}
      {getLineChart(phData, 'ph')}
      {getLineChart(electricConductivityData, 'electricConductivity')}
      {getLineChart(sampleTemperatureData, 'sampleTemperature')}
      {getLineChart(totalOrtophosphateData, 'totalOrtophosphate')}
    </>
  );
}
