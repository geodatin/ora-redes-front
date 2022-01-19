import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { FormControl, Select } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
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
  FormProps,
  emphasis,
  ...rest
}) {
  const classes = useStyles();
  const theme = useTheme();
  const formRef = useRef();
  const [paperWidth, setPaperWidth] = useState(100);

  /**
   * Select the initial paper width
   */
  useEffect(() => {
    const form = formRef.current;
    setPaperWidth(form.offsetWidth);
  }, [formRef?.current?.offsetWidth]);

  return (
    <FormControl
      ref={formRef}
      style={{
        ...style,
      }}
      classes={{ root: classes.root }}
      {...FormProps}
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
              width: paperWidth,
              marginTop: 5,
            },
          },
          ...MenuProps,
        }}
        IconComponent={KeyboardArrowDownRoundedIcon}
        {...rest}
      >
        {children}
      </Select>
    </FormControl>
  );
}

CustomSelect.defaultProps = {
  style: {},
  MenuProps: {},
  FormProps: {},
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
  FormProps: PropTypes.shape(),
  selectStyle: PropTypes.shape(),
  emphasis: PropTypes.bool,
};
