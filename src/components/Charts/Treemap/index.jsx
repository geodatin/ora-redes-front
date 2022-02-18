import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Chart } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';

/**
 * This component renders a Treemap Chart
 * @returns Treemap Chart
 */
export default function Treemap({
  title,
  info,
  data,
  csvCallback,
  fullScreenEnabled,
  options: mergeOptions,
}) {
  Treemap.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    csvCallback: PropTypes.func,
    fullScreenEnabled: PropTypes.bool,
    options: PropTypes.shape(),
  };

  Treemap.defaultProps = {
    data: undefined,
    csvCallback: undefined,
    options: undefined,
    fullScreenEnabled: false,
  };

  const options = {
    plugins: {
      datalabels: false,
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <ChartContainer
      title={title}
      info={info}
      csvCallback={csvCallback}
      fullScreenEnabled={fullScreenEnabled}
      isLoaded={data != null}
    >
      <Chart
        options={merge(options, mergeOptions)}
        data={data}
        type="treemap"
      />
    </ChartContainer>
  );
}
