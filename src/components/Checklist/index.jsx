import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-jss';

import CustomButton from '../CustomButton';
import CustomCheckbox from '../CustomCheckbox';
import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component renders a checklist group
 * @returns checklist group
 */
export default function Checklist({ items, title, onChange }) {
  Checklist.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();

  const INITIAL_STATE = items.map(() => false);
  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    onChange(values);
  }, [values]);

  const clearChecklist = () => {
    setValues(INITIAL_STATE);
  };

  const handleChange = (index) => {
    setValues((prev) => {
      const newValues = [...prev];
      newValues[index] = !newValues[index];
      return newValues;
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.titleHeader}>
        <Typography>{title?.toUpperCase()}</Typography>
        <CustomButton
          disabled={values.every((v) => v === false)}
          mini
          onClick={() => clearChecklist()}
        >
          CLEAR
        </CustomButton>
      </div>

      {items.map((item, index) => (
        <span key={item} className={classes.item}>
          <CustomCheckbox
            checked={values[index]}
            onChange={() => handleChange(index)}
          />
          <Typography
            style={{ marginLeft: 10, color: theme.neutral.gray.main }}
          >
            {item}
          </Typography>
        </span>
      ))}
    </div>
  );
}
