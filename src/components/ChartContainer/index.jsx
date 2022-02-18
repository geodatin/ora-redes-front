import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { IconButton, Skeleton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useTheme } from 'react-jss';

import CustomTooltip from '../CustomTooltip';
import Typography from '../Typography';
import ChartExportMenu from './ChartExportMenu';
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
  csvCallback,
  fullScreenEnabled,
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
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
    style: PropTypes.shape(),
  };

  ChartContainer.defaultProps = {
    pagination: undefined,
    extraButton: undefined,
    csvCallback: undefined,
    fullScreenEnabled: false,
    style: {},
  };

  const classes = useStyles();
  const theme = useTheme();

  const childrenref = useRef(null);
  const refContainer = useRef();

  const handle = useFullScreenHandle();
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <FullScreen handle={handle} onChange={(state) => setIsFullScreen(state)}>
      <li
        ref={refContainer}
        className={isFullScreen ? classes.fullScreenWrapper : classes.wrapper}
      >
        {isLoaded ? (
          <>
            <div className={classes.header}>
              <div className={classes.headerTitle}>
                <Typography variant="body" format="bold">
                  {title}
                </Typography>
                <CustomTooltip title={info} placement="bottom">
                  <div className={classes.tooltipInner}>
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
                {fullScreenEnabled && (
                  <IconButton
                    id="export-button"
                    className={classes.button}
                    onClick={!isFullScreen ? handle.enter : handle.exit}
                  >
                    <FullscreenRoundedIcon
                      style={{ fontSize: 20, color: theme.secondary.dark }}
                    />
                  </IconButton>
                )}
                <ChartExportMenu
                  csvCallback={csvCallback}
                  containerRef={refContainer}
                  childrenRef={childrenref}
                />
              </div>
            </div>

            <div
              className={
                isFullScreen
                  ? classes.fullScreenChartWrapper
                  : classes.chartWrapper
              }
              style={style}
            >
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
    </FullScreen>
  );
}
