import { InfoOutlined } from '@mui/icons-material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useTheme } from 'react-jss';

import CustomTooltip from '../CustomTooltip';
import Typography from '../Typography';
import useStyles from './styles';

/**
 * This funcion provides a chart container item
 * @returns chart container
 */
export default function ChartContainer({ children, title, info }) {
  ChartContainer.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
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
    const chart = childrenref.current;
    const imgAnchor = document.createElement('a');

    if (ext === 'jpeg') {
      imgAnchor.href = chart.toBase64Image('image/jpeg', 1);
      imgAnchor.download = 'chart.jpeg';
      imgAnchor.click();
    } else if (ext === 'png') {
      imgAnchor.href = chart.toBase64Image('image/png', 1);
      imgAnchor.download = 'chart.png';
      imgAnchor.click();
    } else if (ext === 'csv') {
      // csv download logic here
    }

    handleClose();
  };

  return (
    <li className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          <Typography variant="body" format="bold">
            {title}
          </Typography>
          <CustomTooltip title={info} placement="bottom">
            <InfoOutlined
              style={{
                color: theme.secondary.dark,
                fontSize: '16px',
                marginLeft: '5px',
              }}
            />
          </CustomTooltip>
        </div>

        <div>
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
            }}
            PaperProps={{
              style: { backgroundColor: theme.background.popup },
            }}
          >
            <MenuItem key="jpg" onClick={() => handleExport('jpeg')}>
              <Typography variant="body">Baixar JPG</Typography>
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

      <div className={classes.chartWrapper}>
        {React.cloneElement(children, { ref: childrenref })}
      </div>
    </li>
  );
}
