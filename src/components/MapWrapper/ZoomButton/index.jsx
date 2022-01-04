import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Button } from '@mui/material';
import React from 'react';
import { useMap } from 'react-leaflet';

import useStyles from './styles';

/**
 * This component renders a zoom to control the leaflet component
 * @returns Zoom container component
 */
export default function ZoomButton() {
  const classes = useStyles();
  const map = useMap();

  return (
    <div className={classes.container}>
      <Button onClick={() => map.zoomIn()} className={classes.button}>
        <AddRoundedIcon className={classes.icon} />
      </Button>
      <Button onClick={() => map.zoomOut()} className={classes.button}>
        <RemoveRoundedIcon className={classes.icon} />
      </Button>
    </div>
  );
}
