import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';

/**
 * This component renders a Line Chart
 * @returns Line Chart
 */
export default function LineChart({
  title,
  info,
  data,
  options: mergeOptions,
}) {
  LineChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    options: PropTypes.shape(),
  };

  LineChart.defaultProps = {
    data: undefined,
    options: undefined,
  };

  const options = {
    indexAxis: 'x',
    plugins: {},
  };

  return (
    <ChartContainer title={title} info={info} isLoaded={data != null}>
      <Line options={merge(options, mergeOptions)} data={data} />
    </ChartContainer>
  );
}
