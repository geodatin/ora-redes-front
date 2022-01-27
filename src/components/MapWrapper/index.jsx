import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useTheme } from 'react-jss';
import { MapContainer, TileLayer } from 'react-leaflet';

import GeodatinLogo from '../../assets/images/geodatin-map.svg';
import NorthIcon from '../../assets/images/north.svg';
import { darkScheme } from '../../constants/schemes';
import useStyles from './styles';
import ZoomButton from './ZoomButton';

/**
 * This component renders a react-leaflet component
 * @returns Map component
 */
export default function MapWrapper() {
  const position = [-5.0800011, -61.3420118];
  const classes = useStyles();
  const itemsRef = useRef();
  const theme = useTheme();
  const [map, setMap] = useState();
  const lightTileRef = useRef();
  const darkTileRef = useRef();

  useEffect(() => {
    if (itemsRef?.current) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(itemsRef.current);
    }
  }, []);

  useEffect(() => {
    if (map && lightTileRef.current && darkTileRef.current) {
      if (theme === darkScheme) {
        lightTileRef.current.remove();
        darkTileRef.current.addTo(map);
        console.log('dark');
      } else {
        darkTileRef.current.remove();
        lightTileRef.current.addTo(map);
        console.log('light');
      }
    }
  }, [theme, map]);

  return (
    <MapContainer
      whenCreated={setMap}
      className={classes.mapContainer}
      center={position}
      zoom={5}
      zoomControl={false}
    >
      <TileLayer
        ref={lightTileRef}
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        ref={darkTileRef}
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className={classes.tileLayer}
      />
      <div ref={itemsRef} className={classes.itemContainer}>
        <ZoomButton />
      </div>
      <img alt="north" src={NorthIcon} className={classes.northIcon} />
      <a
        href="https://geodatin.com"
        target="_blank"
        rel="noreferrer"
        className={classes.geodatinLogoWrapper}
      >
        <img
          alt="geodatin"
          src={GeodatinLogo}
          className={classes.geodatinLogo}
        />
      </a>
    </MapContainer>
  );
}
