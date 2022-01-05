/* eslint-disable no-unused-vars */
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component renders a custom Chip for the application
 * @returns Custom Chip
 */
export default function CustomChip({
  children,
  bold,
  icon,
  onDelete,
  onClick,
  clickable,
  borderColor,
  labelColor,
  deleteColor,
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Chip
      label={children}
      size="small"
      variant="outlined"
      classes={{
        root: classes.root,
        label: bold ? classes.boldLabel : classes.label,
      }}
      onClick={onClick}
      onDelete={onDelete}
      deleteIcon={
        <ClearRoundedIcon
          style={{ color: deleteColor || theme.neutral.gray.medium }}
        />
      }
      icon={icon}
      clickable={clickable}
      style={{
        borderColor: borderColor || theme.neutral.gray.main,
        color: labelColor || theme.secondary.dark,
      }}
    />
  );
}

CustomChip.defaultProps = {
  bold: false,
  onDelete: undefined,
  icon: undefined,
  onClick: undefined,
  clickable: false,
  borderColor: undefined,
  labelColor: undefined,
  deleteColor: undefined,
};

CustomChip.propTypes = {
  children: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  onDelete: PropTypes.func,
  icon: PropTypes.shape(),
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  borderColor: PropTypes.string,
  labelColor: PropTypes.string,
  deleteColor: PropTypes.string,
};
