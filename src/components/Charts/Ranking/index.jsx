import AlignHorizontalLeftRoundedIcon from '@mui/icons-material/AlignHorizontalLeftRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from 'react-jss';

import ChartContainer from '../../ChartContainer';
import CustomPagination from '../../CustomPagination';

/**
 * This component renders a Ranking Chart
 * @returns Ranking Chart
 */
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

  const theme = useTheme();

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

  const [order, setOrder] = useState(true);

  const handleClick = () => {
    setOrder(!order);
  };

  return (
    <ChartContainer
      title={title}
      info={info}
      isLoaded={data != null}
      extraButton={
        <IconButton id="order-button" onClick={handleClick}>
          <AlignHorizontalLeftRoundedIcon
            style={{
              fontSize: 20,
              color: theme.secondary.dark,
              transform: order ? 'scaleY(1)' : 'scaleY(-1)',
            }}
          />
        </IconButton>
      }
      pagination={
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <CustomPagination
            size="small"
            count={totalPages}
            page={page}
            onChange={(event, value) => setRankingPage(value)}
          />
        </div>
      }
    >
      <Bar style={{ marginTop: -10 }} options={options} data={data} />
    </ChartContainer>
  );
}
