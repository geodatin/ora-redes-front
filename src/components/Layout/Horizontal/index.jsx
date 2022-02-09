import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

/**
 * This component renders a common horizontal layout for application
 * @returns common Layout
 */
export default function HLayout({ leftColumn, mainContainer, rightColumn }) {
  HLayout.propTypes = {
    leftColumn: PropTypes.shape(),
    mainContainer: PropTypes.shape().isRequired,
    rightColumn: PropTypes.shape(),
  };

  HLayout.defaultProps = {
    leftColumn: undefined,
    rightColumn: undefined,
  };

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {leftColumn && (
        <div
          className={classNames(classes.leftColumn, leftColumn.className)}
          style={
            leftColumn?.isHidden ? { minWidth: 0, width: 0, opacity: 0 } : {}
          }
        >
          {leftColumn.children}
        </div>
      )}

      <div
        className={classNames(classes.mainContainer, mainContainer.className)}
      >
        {mainContainer.children}
      </div>

      {rightColumn && (
        <div
          className={classNames(classes.rightColumn, rightColumn.className)}
          style={
            rightColumn?.isHidden ? { minWidth: 0, width: 0, opacity: 0 } : {}
          }
        >
          {rightColumn.children}
        </div>
      )}
    </div>
  );
}
