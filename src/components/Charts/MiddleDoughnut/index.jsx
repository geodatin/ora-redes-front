/* eslint-disable no-unused-vars */
import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import Typography from '../../Typography';
import useStyles from './styles';

/**
 * This component renders a Doughnut Chart with custom legend
 * @returns Legend Doughnut Chart
 */
export default function MiddleDoughnut({
  doughnut,
  description,
  descriptionVariant,
  children,
  style,
}) {
  MiddleDoughnut.propTypes = {
    doughnut: PropTypes.node.isRequired,
    description: PropTypes.string,
    children: PropTypes.node.isRequired,
    style: PropTypes.shape(),
    descriptionVariant: PropTypes.string,
  };

  MiddleDoughnut.defaultProps = {
    style: {},
    description: undefined,
    descriptionVariant: 'body',
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.wrapper}>
      <div className={classes.doughnutWrapper} style={style}>
        {doughnut}
        <div className={classes.doughnutMiddle}>{children}</div>
      </div>
      {description && (
        <div className={classes.doughnutDescription}>
          <Typography
            style={{
              color: theme.neutral.gray.main,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
            variant={descriptionVariant}
          >
            {description}
          </Typography>
        </div>
      )}
    </div>
  );
}
