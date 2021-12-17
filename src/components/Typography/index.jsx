import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

/**
 * This component renders a custom Typography for application
 * @returns Application's Typography
 */
export default function Typography({ children, variant, style, className }) {
  const classes = useStyles();
  const Tag = variant === 'body' || variant === 'caption' ? 'span' : variant;

  return (
    <Tag className={classNames(classes[variant], classes[style], className)}>
      {children}
    </Tag>
  );
}

Typography.defaultProps = {
  children: undefined,
  className: '',
  variant: 'body',
  style: undefined,
};

Typography.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.string,
};
