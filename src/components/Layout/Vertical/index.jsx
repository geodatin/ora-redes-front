import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

/**
 * This component renders a common horizontal layout for application
 * @returns common Layout
 */
export default function VLayout({ upRow, mainContainer, downRow }) {
  VLayout.propTypes = {
    upRow: PropTypes.shape(),
    mainContainer: PropTypes.shape().isRequired,
    downRow: PropTypes.shape(),
  };

  VLayout.defaultProps = {
    upRow: undefined,
    downRow: undefined,
  };

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {upRow && (
        <div className={classNames(classes.upRow, upRow.className)}>
          {upRow.children}
        </div>
      )}

      <div
        className={classNames(classes.mainContainer, mainContainer.className)}
      >
        {mainContainer.children}
      </div>

      {downRow && (
        <div className={classNames(classes.downRow, downRow.className)}>
          {downRow.children}
        </div>
      )}
    </div>
  );
}
