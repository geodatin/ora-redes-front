import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';

export default function RankingChart({ title, info, data }) {
  RankingChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape().isRequired,
  };

  const options = {
    indexAxis: 'y',
    plugins: {
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <ChartContainer title={title} info={info}>
      <Bar style={{ marginTop: -10 }} options={options} data={data} />
    </ChartContainer>
  );
}
