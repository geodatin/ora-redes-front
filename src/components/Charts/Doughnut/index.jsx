import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';

/**
 * This component renders a Doughnut Chart
 * @returns Doughnut Chart
 */
export default function DoughnutChart({
  title,
  info,
  data,
  csvCallback,
  options: mergeOptions,
}) {
  DoughnutChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape().isRequired,
    csvCallback: PropTypes.func,
    options: PropTypes.shape(),
  };

  DoughnutChart.defaultProps = {
    options: undefined,
    csvCallback: undefined,
  };

  const options = {
    plugins: {},
    aspectRatio: 1,
    radius: '70%',
    cutout: 110,
    rotation: 180,
  };

  return (
    <ChartContainer
      title={title}
      info={info}
      csvCallback={csvCallback}
      isLoaded={data != null}
    >
      <Doughnut options={merge(options, mergeOptions)} data={data} />
    </ChartContainer>
  );
}
