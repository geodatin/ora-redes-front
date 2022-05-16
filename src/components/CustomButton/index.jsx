import Button from '@mui/material/Button';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component renders a custom Button for the application
 * @returns Custom Button
 */
export default function CustomButton({
  children,
  icon,
  onClick,
  backgroundColor,
  labelColor,
  style,
  variant,
  className,
  mini,
  disabled,
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Button
      disabled={disabled}
      variant={variant}
      classes={{
        root: classNames(mini ? classes.mini : classes.root, className),
      }}
      onClick={onClick}
      icon={icon}
      style={{
        color: disabled
          ? theme.button.disabledLabel
          : labelColor || theme.neutral.white,
        backgroundColor: disabled
          ? theme.button.disabled
          : backgroundColor || theme.primary.main,
        fontSize: mini ? 12.8 : 16,
        fontWeight: mini ? 700 : 400,
        ...style,
      }}
    >
      {children}
    </Button>
  );
}

CustomButton.defaultProps = {
  icon: undefined,
  onClick: undefined,
  backgroundColor: undefined,
  labelColor: undefined,
  style: {},
  variant: 'container',
  className: undefined,
  mini: false,
  disabled: false,
};

CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.shape(),
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  labelColor: PropTypes.string,
  style: PropTypes.shape(),
  variant: PropTypes.string,
  className: PropTypes.string,
  mini: PropTypes.bool,
  disabled: PropTypes.bool,
};
