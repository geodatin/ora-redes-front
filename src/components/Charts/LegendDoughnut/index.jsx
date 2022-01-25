import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from 'react-jss';

import ChartContainer from '../../ChartContainer';
import Typography from '../../Typography';
import MiddleDoughnut from '../MiddleDoughnut';
import useStyles from './styles';

/**
 * This component renders a Doughnut Chart with custom legend
 * @returns Legend Doughnut Chart
 */
export default function LegendDoughnutChart({
  title,
  info,
  data,
  options: mergeOptions,
}) {
  LegendDoughnutChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    options: PropTypes.shape(),
  };

  LegendDoughnutChart.defaultProps = {
    options: {},
    data: undefined,
  };

  const classes = useStyles();
  const theme = useTheme();

  const getTotal = (array) => {
    const total = array?.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );

    return total;
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(context) {
            const dataset = data.datasets[context.datasetIndex];
            const total = getTotal(dataset.data);
            const currentValue = dataset.data[context.dataIndex];
            const percentage = (currentValue / total) * 100;

            return ` ${percentage.toFixed(2)}%`;
          },
        },
      },
    },
    aspectRatio: 1,
    radius: '100%',
    cutout: 55,
    rotation: 180,
  };

  function legendItem(label, value, color) {
    return (
      <div key={label} className={classes.legendItem}>
        <div className={classes.circle} style={{ background: color }} />
        <div className={classes.legendNameValue}>
          <Typography variant="body">{label}</Typography>
          <Typography style={{ marginRight: 10 }} format="bold" variant="body">
            {value}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <ChartContainer
      style={{ height: 'auto' }}
      title={title}
      info={info}
      isLoaded={data != null}
    >
      <div className={classes.childrenWrapper}>
        <MiddleDoughnut
          doughnut={
            <Doughnut options={merge(options, mergeOptions)} data={data} />
          }
        >
          <Typography format="bold" variant="h3">
            {getTotal(data?.datasets[0].data)}
          </Typography>
          <Typography variant="body" style={{ color: theme.neutral.gray.main }}>
            {data?.datasets[0].label}
          </Typography>
        </MiddleDoughnut>

        <div className={classes.legendWrapper}>
          {data?.labels.map((label, index) =>
            legendItem(
              label,
              data.datasets[0].data[index],
              data.datasets[0].backgroundColor[index]
            )
          )}
        </div>
      </div>
    </ChartContainer>
  );
}
