import PropTypes from 'prop-types';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';

export default function DoughnutChart({
  title,
  info,
  data,
  options: mergeOptions,
}) {
  DoughnutChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape().isRequired,
    options: PropTypes.shape(),
  };

  DoughnutChart.defaultProps = {
    options: undefined,
  };

  const options = {
    plugins: {},
    aspectRatio: 1,
    radius: '70%',
    cutout: 110,
    rotation: 180,
  };

  return (
    <ChartContainer title={title} info={info} isLoaded={data != null}>
      <Doughnut options={{ ...options, ...mergeOptions }} data={data} />
    </ChartContainer>
  );
}
