/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import LineChart from '../../../../../../components/Charts/Line';
import Multiple from '../../../../../../components/Charts/Multiple';
import api from '../../../../../../services/api';
import { downloadCSV } from '../../../../../../utils/helpers';

/**
 * This function provides time series of RQA network
 * @returns RQATimeSeries
 */
export default function RQATimeSeries({ station, timeGrouping }) {
  RQATimeSeries.propTypes = {
    station: PropTypes.shape(),
    timeGrouping: PropTypes.string.isRequired,
  };

  RQATimeSeries.defaultProps = {
    station: {},
  };

  const theme = useTheme();
  const { t } = useTranslation();

  const [turbidityData, setTurbidityData] = useState();
  const [phData, setPhData] = useState();
  const [odData, setOdData] = useState();
  const [electricConductivityData, setElectricConductivityData] = useState();
  const [sampleTemperatureData, setSampleTemperatureData] = useState();
  const [totalDissolvedSolidData, setTotalDissolvedSolidData] = useState();
  const [totalNitrogenData, setTotalNitrogenData] = useState();
  const [totalOrtophosphateData, setTotalOrtophosphateData] = useState();
  const [totalSuspensionSolidData, setTotalSuspensionSolidData] = useState();

  const chartFetches = [
    { dataType: 'turbidity', dataSetter: setTurbidityData },
    { dataType: 'ph', dataSetter: setPhData },
    { dataType: 'OD', dataSetter: setOdData },
    {
      dataType: 'electricConductivity',
      dataSetter: setElectricConductivityData,
    },
    { dataType: 'sampleTemperature', dataSetter: setSampleTemperatureData },
    { dataType: 'totalDissolvedSolid', dataSetter: setTotalDissolvedSolidData },
    { dataType: 'totalNitrogen', dataSetter: setTotalNitrogenData },
    { dataType: 'totalOrtophosphate', dataSetter: setTotalOrtophosphateData },
    {
      dataType: 'totalSuspensionSolid',
      dataSetter: setTotalSuspensionSolidData,
    },
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

  const getLineChart = (data, dataType) => (
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
              theme.secondary.light
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

  return (
    <>
      {getLineChart(turbidityData, 'turbidity')}
      {getLineChart(phData, 'ph')}
      {getLineChart(odData, 'OD')}
      {getLineChart(electricConductivityData, 'electricConductivity')}
      {getLineChart(sampleTemperatureData, 'sampleTemperature')}
      {getLineChart(totalDissolvedSolidData, 'totalDissolvedSolid')}
      {getLineChart(totalNitrogenData, 'totalNitrogen')}
      {getLineChart(totalOrtophosphateData, 'totalOrtophosphate')}
      {getLineChart(totalSuspensionSolidData, 'totalSuspensionSolid')}
    </>
  );
}
