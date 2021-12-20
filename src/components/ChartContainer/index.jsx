import PropTypes from 'prop-types';
import React from 'react';

import Typography from '../Typography';
import useStyles from './styles';

/**
 * This funcion provides a chart container item
 * @returns statistics list
 */
export default function ChartContainer({ title, ...props }) {
  ChartContainer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  const classes = useStyles();

  return (
    <li className={classes.wrapper}>
      <Typography variant="body" format="bold">
        {title}
      </Typography>
      <div className={classes.chartWrapper}>{props.children}</div>
    </li>
  );
}
