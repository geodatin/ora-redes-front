import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Dialog, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component encapsulates the share dialog.
 */
export default function CustomDialog({ children, title, open, onClose }) {
  const classes = useStyles();
  const theme = useTheme();

  /**
   * This function handles the share dialog closing.
   */
  function handleShareClose() {
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={() => handleShareClose()}
      classes={{ root: classes.dialogContainer }}
    >
      <div className={classes.header}>
        <Typography
          style={{
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          onClick={() => handleShareClose()}
          style={{ color: theme.neutral.gray.light }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <span className={classes.separator} />
      </div>
      <div className={classes.content}>{children}</div>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool])),
  ]).isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
