import L from 'leaflet';
import PropTypes from 'prop-types';
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
export default function MapWrapper({ children, ...rest }) {
  const position = [-7.3800011, -64.3420118];
  const classes = useStyles();
  const itemsRef = useRef();
  const theme = useTheme();
  const [map, setMap] = useState();
  const lightTileRef = useRef();
  const darkTileRef = useRef();

  /**
   * Disable click propagation
   */
  useEffect(() => {
    if (itemsRef?.current) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(itemsRef.current);
    }
  }, []);

  /**
   * Handle map darkmode
   */
  useEffect(() => {
    if (map && lightTileRef.current && darkTileRef.current) {
      if (theme === darkScheme) {
        lightTileRef.current.remove();
        darkTileRef.current.addTo(map);
      } else {
        darkTileRef.current.remove();
        lightTileRef.current.addTo(map);
      }
      map.getContainer().style.backgroundColor = theme.background.main;
    }
  }, [theme, map]);

  return (
    <MapContainer
      whenCreated={setMap}
      className={classes.mapContainer}
      center={position}
      zoom={5}
      zoomControl={false}
      {...rest}
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
      {children}
    </MapContainer>
  );
}

MapWrapper.defaultProps = {
  children: undefined,
};

MapWrapper.propTypes = {
  children: PropTypes.node,
};
