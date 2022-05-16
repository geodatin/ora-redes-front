import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

/**
 * This component renders a custom Typography for application
 * @returns Application's Typography
 */
export default function Typography({
  children,
  variant,
  format,
  className,
  style,
}) {
  const classes = useStyles();
  const Tag = variant === 'body' || variant === 'caption' ? 'span' : variant;

  return (
    <Tag
      style={style}
      className={classNames(classes[variant], classes[format], className)}
    >
      {children}
    </Tag>
  );
}

Typography.defaultProps = {
  children: undefined,
  className: '',
  variant: 'body',
  format: undefined,
  style: {},
};

Typography.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
  format: PropTypes.string,
  style: PropTypes.shape(),
};
