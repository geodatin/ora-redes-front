import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component renders a custom toggle button for the application
 * @returns Custom Toggle Button
 */
export default function CustomToggleButton({
  options,
  value,
  handleChange,
  style,
  typographyVariant,
}) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper} style={style}>
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
        size="small"
        fullWidth
      >
        {options.map((option, index) => (
          <ToggleButton
            key={option}
            style={{ textTransform: 'none' }}
            value={index}
          >
            <Typography variant={typographyVariant} format="bold">
              {option}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

CustomToggleButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.shape(),
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  typographyVariant: PropTypes.string,
};

CustomToggleButton.defaultProps = {
  style: {},
  typographyVariant: 'body',
};
