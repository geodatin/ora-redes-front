import { InfoOutlined } from '@mui/icons-material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { IconButton, Menu, MenuItem, Skeleton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from 'react-component-export-image';
import { useTheme } from 'react-jss';

import CustomTooltip from '../CustomTooltip';
import Typography from '../Typography';
import useStyles from './styles';

/**
 * This funcion provides a chart container item
 * @returns chart container
 */
export default function ChartContainer({
  children,
  title,
  info,
  pagination,
  extraButton,
  isLoaded,
  style,
}) {
  ChartContainer.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    pagination: PropTypes.node,
    extraButton: PropTypes.node,
    isLoaded: PropTypes.bool.isRequired,
    style: PropTypes.shape(),
  };

  ChartContainer.defaultProps = {
    pagination: undefined,
    extraButton: undefined,
    style: {},
  };

  const classes = useStyles();
  const theme = useTheme();
  const childrenref = useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (ext) => {
    if (ext === 'csv') {
      // csv logic here
      handleClose();
      return;
    }

    const { current } = childrenref;
    const isDiv = current?.nodeName === 'DIV';

    if (!isDiv) {
      const imgAnchor = document.createElement('a');
      imgAnchor.href = current.toBase64Image(`image/${ext}`, 1);
      imgAnchor.download = `chart.${ext}`;
      imgAnchor.click();
    } else if (ext === 'jpeg') {
      exportComponentAsJPEG(childrenref, { fileName: 'chart' });
    } else if (ext === 'png') {
      exportComponentAsPNG(childrenref, { fileName: 'chart' });
    }

    handleClose();
  };

  return (
    <li className={classes.wrapper}>
      {isLoaded ? (
        <>
          <div className={classes.header}>
            <div className={classes.headerTitle}>
              <Typography variant="body" format="bold">
                {title}
              </Typography>
              <CustomTooltip title={info} placement="bottom">
                <div
                  style={{
                    margin: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <InfoOutlined
                    style={{
                      color: theme.secondary.dark,
                      fontSize: '18px',
                    }}
                  />
                </div>
              </CustomTooltip>
            </div>

            <div>
              {extraButton && extraButton}
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
                <MenuItem key="csv" onClick={() => handleExport('csv')}>
                  <Typography variant="body">Baixar CSV</Typography>
                </MenuItem>
              </Menu>
            </div>
          </div>

          <div className={classes.chartWrapper} style={style}>
            {React.cloneElement(children, { ref: childrenref })}
          </div>
          {pagination && pagination}
        </>
      ) : (
        <Stack spacing={1}>
          <Skeleton sx={{ bgcolor: theme.stroke.light }} variant="text" />
          <Skeleton
            sx={{ bgcolor: theme.stroke.light }}
            variant="rectangular"
            width="100%"
            height={300}
          />
        </Stack>
      )}
    </li>
  );
}
