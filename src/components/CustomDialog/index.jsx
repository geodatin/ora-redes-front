import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button, Dialog, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component renders a custom dialog wrapper.
 */
export default function CustomDialog({
  children,
  title,
  open,
  onClose,
  button,
}) {
  const classes = useStyles();
  const theme = useTheme();

  /**
   * This function handles the dialog closing.
   */
  function handleOnClose() {
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={() => handleOnClose()}
      classes={{ root: classes.dialogContainer }}
      style={{ zIndex: 20000 }}
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
          onClick={() => handleOnClose()}
          style={{ color: theme.neutral.gray.light }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <span className={classes.separator} />
      </div>
      <div className={classes.content}>{children}</div>
      {button?.isEnabled && (
        <div style={{ padding: '15px', width: '100%' }}>
          <Button
            className={classes.button}
            variant="contained"
            disableElevation
            onClick={() => handleOnClose()}
          >
            {button?.text}
          </Button>
        </div>
      )}
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
  button: PropTypes.shape(),
};

CustomDialog.defaultProps = {
  button: { isEnabled: false, text: undefined },
};
