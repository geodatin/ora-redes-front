import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

export default function CustomTypography({
  children,
  variant,
  style,
  className,
}) {
  CustomTypography.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.string,
    style: PropTypes.string,
  };

  CustomTypography.defaultProps = {
    children: undefined,
    className: '',
    variant: 'body',
    style: undefined,
  };

  const classes = useStyles();
  const Tag = variant === 'body' || variant === 'caption' ? 'span' : variant;

  return (
    <Tag className={classNames(classes[variant], classes[style], className)}>
      {children}
    </Tag>
  );
}
