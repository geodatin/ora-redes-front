import AlignHorizontalLeftRoundedIcon from '@mui/icons-material/AlignHorizontalLeftRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
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
  csvCallback,
  params,
  setParams,
}) {
  RankingChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    csvCallback: PropTypes.func,
    params: PropTypes.shape(),
    setParams: PropTypes.func.isRequired,
  };

  RankingChart.defaultProps = {
    data: undefined,
    csvCallback: undefined,
    params: {
      order: true,
      page: 1,
      totalPages: 1,
    },
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
      y: {
        ticks: {
          crossAlign: 'far',
        },
      },
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  const handleChangeOrder = () => {
    setParams((prevParams) => ({ ...prevParams, order: !prevParams.order }));
  };

  return (
    <ChartContainer
      title={title}
      info={info}
      isLoaded={data != null}
      csvCallback={csvCallback}
      extraButton={
        <IconButton id="order-button" onClick={handleChangeOrder}>
          <AlignHorizontalLeftRoundedIcon
            style={{
              fontSize: 20,
              color: theme.secondary.dark,
              transform: params.order ? 'scaleY(1)' : 'scaleY(-1)',
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
            count={params.totalPages}
            page={params.page}
            onChange={(event, value) =>
              setParams((prevParams) => ({ ...prevParams, page: value }))
            }
          />
        </div>
      }
    >
      <Bar style={{ marginTop: -10 }} options={options} data={data} />
    </ChartContainer>
  );
}
