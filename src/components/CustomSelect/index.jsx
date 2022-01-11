import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { FormControl, Select } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component renders a custom Select for the application
 * @returns Custom Select
 */
export default function CustomSelect({
  style,
  selectStyle,
  children,
  MenuProps,
  SelectProps,
  emphasis,
  ...rest
}) {
  const classes = useStyles();
  const theme = useTheme();
  const formRef = useRef();

  return (
    <FormControl
      ref={formRef}
      style={{
        ...style,
      }}
      classes={{ root: classes.root }}
      {...rest}
    >
      <Select
        autoWidth
        classes={{
          select: emphasis ? classes.selectEmphasis : classes.select,
          icon: classes.icon,
        }}
        style={{
          ...selectStyle,
        }}
        MenuProps={{
          MenuListProps: {
            style: {
              color: theme.secondary.dark,
            },
          },
          PaperProps: {
            style: {
              backgroundColor: theme.background.popup,
              width: formRef?.current?.offsetWidth,
            },
          },
          ...MenuProps,
        }}
        IconComponent={KeyboardArrowDownRoundedIcon}
        {...SelectProps}
      >
        {children}
      </Select>
    </FormControl>
  );
}

CustomSelect.defaultProps = {
  style: {},
  MenuProps: {},
  SelectProps: {},
  selectStyle: {},
  emphasis: false,
};

CustomSelect.propTypes = {
  style: PropTypes.shape(),
  children: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  MenuProps: PropTypes.shape(),
  SelectProps: PropTypes.shape(),
  selectStyle: PropTypes.shape(),
  emphasis: PropTypes.bool,
};
