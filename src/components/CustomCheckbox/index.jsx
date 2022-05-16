/* eslint-disable jsx-a11y/label-has-associated-control */
import { Checkbox, createSvgIcon } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component renders a custom Checkbox for the application
 * @returns Custom Checkbox
 */
export default function CustomCheckbox({ style, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();

  const UncheckedIcon = createSvgIcon(
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="4.5"
        stroke={theme.neutral.gray.main}
      />
      <path
        d="M5 10.5L8 13.5L14.5 7"
        stroke={theme.neutral.gray.main}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    'CheckBoxOutlineBlankIcon'
  );

  const CheckedIcon = useMemo(
    () =>
      createSvgIcon(
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="19"
            height="19"
            rx="4.5"
            fill={theme.primary.main}
            stroke={theme.primary.main}
          />
          <path
            d="M5 10.5L8 13.5L14.5 7"
            stroke={theme.neutral.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>,
        'CheckBoxIcon'
      ),
    [theme]
  );

  return (
    <Checkbox
      type="checkbox"
      classes={{ root: classes.checkbox }}
      style={{
        ...style,
      }}
      icon={<UncheckedIcon />}
      checkedIcon={<CheckedIcon />}
      {...rest}
    />
  );
}

CustomCheckbox.defaultProps = {
  style: {},
};

CustomCheckbox.propTypes = {
  style: PropTypes.shape(),
};
