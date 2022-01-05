import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import ChartContainer from '../../ChartContainer';
import CustomPagination from '../../CustomPagination';

export default function RankingChart({
  title,
  info,
  data,
  totalPages,
  page,
  setRankingPage,
}) {
  RankingChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape().isRequired,
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    setRankingPage: PropTypes.func.isRequired,
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
    <ChartContainer
      title={title}
      info={info}
      isLoaded={data != null}
      pagination={
        <CustomPagination
          size="small"
          count={totalPages}
          page={page}
          onChange={(event, value) => setRankingPage(value)}
        />
      }
    >
      <Bar style={{ marginTop: -10 }} options={options} data={data} />
    </ChartContainer>
  );
}
