import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';

/**
 * This component renders a Bar Chart
 * @returns Bar Chart
 */
export default function BarChart({
  title,
  info,
  data,
  csvCallback,
  fullScreenEnabled,
  options: mergeOptions,
}) {
  BarChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    options: PropTypes.shape(),
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  BarChart.defaultProps = {
    data: undefined,
    options: undefined,
    csvCallback: undefined,
    fullScreenEnabled: false,
  };

  const options = {
    interaction: {
      mode: 'index',
      intersect: false,
    },
    indexAxis: 'y',
    plugins: {},
    scales: {
      y: {
        title: {
          display: false,
          padding: 0,
          font: {
            size: 13,
          },
        },
      },
    },
  };

  return (
    <ChartContainer
      title={title}
      info={info}
      csvCallback={csvCallback}
      fullScreenEnabled={fullScreenEnabled}
      isLoaded={!!data}
    >
      <Bar options={merge(options, mergeOptions)} data={data} />
    </ChartContainer>
  );
}
