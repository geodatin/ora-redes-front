import { InfoOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import CustomTooltip from '../CustomTooltip';
import Typography from '../Typography';
import useStyles from './styles';

/**
 * This funcion provides a chart container item
 * @returns statistics list
 */
export default function ChartContainer({ title, info, ...props }) {
  ChartContainer.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    <li className={classes.wrapper}>
      <div className={classes.header}>
        <Typography variant="body" format="bold">
          {title}
        </Typography>
        <CustomTooltip title={info} placement="bottom">
          <InfoOutlined
            style={{
              color: theme.secondary.dark,
              fontSize: '16px',
              marginLeft: '5px',
            }}
          />
        </CustomTooltip>
      </div>

      <div className={classes.chartWrapper}>{props.children}</div>
    </li>
  );
}
