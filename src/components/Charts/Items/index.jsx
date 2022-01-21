import PropTypes from 'prop-types';
import React from 'react';

import ChartContainer from '../../ChartContainer';
import Typography from '../../Typography';
import useStyles from './styles';

/**
 * This component renders a items chart
 * @returns items chart
 */
export default function ItemsChart({ title, info, data }) {
  ItemsChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  const classes = useStyles();

  return (
    <ChartContainer
      style={{ height: 'auto' }}
      title={title}
      info={info}
      isLoaded={data != null}
    >
      <div className={classes.childrenWrapper}>
        {data.map((item) => (
          <div key={item.title} className={classes.item}>
            <div
              style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'center',
              }}
            >
              {item?.icon}
              <Typography format="bold" variant="body" style={{ fontSize: 15 }}>
                {' '}
                {item.title}
              </Typography>
            </div>
            <div>
              <Typography format="bold"> {item.value}</Typography>
              <Typography> {item.dataType}</Typography>
            </div>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
}
