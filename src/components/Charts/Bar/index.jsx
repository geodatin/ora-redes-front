import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';

export default function BarChart({ title, info, data, options: mergeOptions }) {
  BarChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape().isRequired,
    options: PropTypes.shape(),
  };

  BarChart.defaultProps = {
    options: undefined,
  };

  const options = {
    indexAxis: 'y',
    plugins: {},
  };

  return (
    <ChartContainer title={title} info={info}>
      <Bar options={{ ...options, ...mergeOptions }} data={data} />
    </ChartContainer>
  );
}
