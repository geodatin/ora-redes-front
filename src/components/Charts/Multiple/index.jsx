import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Chart } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';

/**
 * This component renders a Multiple Chart
 * @returns Multiple Chart
 */
export default function Multiple({
  title,
  info,
  data,
  csvCallback,
  fullScreenEnabled,
  options: mergeOptions,
}) {
  Multiple.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    csvCallback: PropTypes.func,
    fullScreenEnabled: PropTypes.bool,
    options: PropTypes.shape(),
  };

  Multiple.defaultProps = {
    data: undefined,
    csvCallback: undefined,
    options: undefined,
    fullScreenEnabled: false,
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      datalabels: false,
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          padding: 0,
          display: false,
          font: {
            size: 13,
          },
        },
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          padding: 0,
          display: false,
          font: {
            size: 13,
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainer
      title={title}
      info={info}
      csvCallback={csvCallback}
      isLoaded={data != null}
      fullScreenEnabled={fullScreenEnabled}
    >
      <Chart options={merge(options, mergeOptions)} data={data} type="bar" />
    </ChartContainer>
  );
}
