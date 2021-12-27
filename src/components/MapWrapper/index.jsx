import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import useStyles from './styles';
import ZoomButton from './ZoomButton';

/**
 * This component renders a react-leaflet component
 * @returns Map component
 */
export default function MapWrapper() {
  const position = [-5.0800011, -61.3420118];
  const classes = useStyles();

  return (
    <MapContainer
      className={classes.mapContainer}
      center={position}
      zoom={5}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomButton />
    </MapContainer>
  );
}
