import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from 'react-component-export-image';
import { useTheme } from 'react-jss';

import Typography from '../../Typography';
import useStyles from './styles';

/**
 * This funcion provides a chart export menu
 * @returns chart export menu
 */
export default function ChartExportMenu({
  csvCallback,
  containerRef,
  childrenRef,
}) {
  ChartExportMenu.propTypes = {
    csvCallback: PropTypes.func,
    childrenRef: PropTypes.shape().isRequired,
    containerRef: PropTypes.shape().isRequired,
  };

  ChartExportMenu.defaultProps = {
    csvCallback: undefined,
  };

  const theme = useTheme();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (ext) => {
    if (ext === 'csv') {
      csvCallback?.();
      handleClose();
      return;
    }

    const filename = 'chart';
    const { current: chart } = childrenRef;

    const isDiv = chart?.nodeName === 'DIV';
    if (isDiv) {
      const lastBackground = chart.style.backgroundColor;
      chart.style.backgroundColor = theme.background.main;
      if (ext === 'jpeg') {
        exportComponentAsJPEG(childrenRef, { fileName: filename });
      } else if (ext === 'png') {
        exportComponentAsPNG(childrenRef, { fileName: filename });
      }
      chart.style.backgroundColor = lastBackground;
    } else {
      const { canvas } = chart;
      const ctx = canvas.getContext('2d');

      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = theme.background.main;
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();

      const imgAnchor = document.createElement('a');
      imgAnchor.href = chart.toBase64Image(`image/${ext}`, 1);
      imgAnchor.download = `${filename}.${ext}`;
      imgAnchor.click();
    }

    handleClose();
  };

  return (
    <>
      <IconButton
        id="export-button"
        className={classes.button}
        onClick={handleClick}
      >
        <DownloadRoundedIcon
          style={{ fontSize: 20, color: theme.secondary.dark }}
        />
      </IconButton>
      <Menu
        id="export-menu"
        container={containerRef.current}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        style={{ zIndex: 20000 }}
        MenuListProps={{
          style: {
            color: theme.secondary.dark,
          },
          className: classes.menu,
        }}
        PaperProps={{
          style: { backgroundColor: theme.popup.background },
          elevation: 1,
        }}
      >
        <MenuItem key="jpeg" onClick={() => handleExport('jpeg')}>
          <Typography variant="body">Baixar JPEG</Typography>
        </MenuItem>
        <MenuItem key="png" onClick={() => handleExport('png')}>
          <Typography variant="body">Baixar PNG</Typography>
        </MenuItem>
        {csvCallback && (
          <MenuItem key="csv" onClick={() => handleExport('csv')}>
            <Typography variant="body">Baixar CSV</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
