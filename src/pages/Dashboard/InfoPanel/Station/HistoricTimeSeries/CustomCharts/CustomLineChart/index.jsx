/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import LineChart from '../../../../../../../components/Charts/Line';
import { dataTypes } from '../../../../../../../constants/options';
import api from '../../../../../../../services/api';
import { downloadCSV } from '../../../../../../../utils/helpers';

function CustomLineChartComponent({ station, data, dataType }) {
  CustomLineChartComponent.propTypes = {
    station: PropTypes.shape().isRequired,
    data: PropTypes.shape(),
    dataType: PropTypes.string,
  };

  CustomLineChartComponent.defaultProps = {
    data: undefined,
    dataType: undefined,
  };

  const { t } = useTranslation();
  const theme = useTheme();

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

  const csvFetching = () => {
    api
      .get(
        `/observation/timeSeries/${station.network.toLowerCase()}/${
          station.code
        }/${dataType}/hour`,
        {
          params: {
            format: 'csv',
          },
        }
      )
      .then(({ data: csvData }) => {
        downloadCSV(
          csvData,
          t(`specific.statistics.charts.timeSeries.${dataType}.title`)
        );
      });
  };

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
      csvCallback={() => csvFetching()}
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
}

export const CustomLineChart = React.memo(CustomLineChartComponent);
