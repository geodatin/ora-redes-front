import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';

/**
 * This component renders a Bar Chart
 * @returns Bar Chart
 */
export default function BarChart({ title, info, data, options: mergeOptions }) {
  BarChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    options: PropTypes.shape(),
  };

  BarChart.defaultProps = {
    data: undefined,
    options: undefined,
  };

  const options = {
    indexAxis: 'y',
    plugins: {},
  };

  return (
    <ChartContainer title={title} info={info} isLoaded={data != null}>
      <Bar options={merge(options, mergeOptions)} data={data} />
    </ChartContainer>
  );
}
