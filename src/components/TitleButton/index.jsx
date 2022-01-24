import PropTypes from 'prop-types';
import React from 'react';

import CustomButton from '../CustomButton';
import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component renders a title button
 * @returns title button
 */
export default function TitleButton({
  title,
  buttonDisabled,
  buttonTitle,
  onClick,
}) {
  TitleButton.propTypes = {
    title: PropTypes.string.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography>{title?.toUpperCase()}</Typography>
      <CustomButton mini disabled={buttonDisabled} onClick={() => onClick()}>
        {buttonTitle}
      </CustomButton>
    </div>
  );
}
