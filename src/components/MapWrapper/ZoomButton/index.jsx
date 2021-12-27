import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Button } from '@mui/material';
import L from 'leaflet';
import React, { useRef, useEffect } from 'react';
import { useMap } from 'react-leaflet';

import useStyles from './styles';

/**
 * This component renders a zoom to control the leaflet component
 * @returns Zoom container component
 */
export default function MapWrapper() {
  const classes = useStyles();
  const ref = useRef();
  const map = useMap();

  useEffect(() => {
    if (ref?.current) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(ref.current);
    }
  }, []);

  return (
    <div ref={ref} className={classes.container}>
      <Button onClick={() => map.zoomIn()} className={classes.button}>
        <AddRoundedIcon className={classes.icon} />
      </Button>
      <Button onClick={() => map.zoomOut()} className={classes.button}>
        <RemoveRoundedIcon className={classes.icon} />
      </Button>
    </div>
  );
}
