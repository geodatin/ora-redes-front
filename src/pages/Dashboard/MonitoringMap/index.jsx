/* eslint-disable no-unused-vars */
import L, { GeoJSON } from 'leaflet';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'react-jss';
import { Marker, Popup, TileLayer } from 'react-leaflet';

import BluesStationDark from '../../../assets/icons/map/blue-station-dark.png';
import BluesStationLight from '../../../assets/icons/map/blue-station-light.png';
import GrayStationDark from '../../../assets/icons/map/gray-station-dark.png';
import GrayStationLight from '../../../assets/icons/map/gray-station-light.png';
import GreenStationDark from '../../../assets/icons/map/green-station-dark.png';
import GreenStationLight from '../../../assets/icons/map/green-station-light.png';
import OrangeStationDark from '../../../assets/icons/map/orange-station-dark.png';
import OrangeStationLight from '../../../assets/icons/map/orange-station-light.png';
import BorderGeojson from '../../../assets/shapes/border.json';
import MapWrapper from '../../../components/MapWrapper';
import { networks } from '../../../constants/options';
import { darkScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import api from '../../../services/api';

console.log(BorderGeojson);
/**
 * This function provides the monitoring map
 * @returns Monitoring Map
 */
export default function MonitoringMap() {
  const {
    values: { autocompleteSelection },
  } = useContext(FilteringContext);
  const [points, setPoints] = useState();
  const theme = useTheme();

  useEffect(() => {
    api
      .post('/station/location', { filters: autocompleteSelection })
      .then(({ data }) => {
        setPoints(data.features);
      });
  }, [autocompleteSelection]);

  const blueStation = useMemo(
    () =>
      L.icon({
        iconUrl: theme === darkScheme ? BluesStationDark : BluesStationLight,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    [theme]
  );

  const greenStation = useMemo(
    () =>
      L.icon({
        iconUrl: theme === darkScheme ? GreenStationDark : GreenStationLight,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    [theme]
  );

  const grayStation = useMemo(
    () =>
      L.icon({
        iconUrl: theme === darkScheme ? GrayStationDark : GrayStationLight,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    [theme]
  );

  const orangeStation = useMemo(
    () =>
      L.icon({
        iconUrl: theme === darkScheme ? OrangeStationDark : OrangeStationLight,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    [theme]
  );

  const markers = useMemo(() => {
    if (points) {
      return points.map((point, index) => {
        const key = `${point?.properties.code}-${index}`;
        const position = [...point.geometry.coordinates];
        position.reverse();
        let icon;

        if (point.properties.network === networks.hydrologic.code) {
          icon = blueStation;
        } else if (point.properties.network === networks.quality.code) {
          icon = orangeStation;
        } else if (point.properties.network === networks.hybam.code) {
          icon = greenStation;
        } else {
          icon = grayStation;
        }

        return (
          <Marker key={key} position={position} icon={icon}>
            <Popup>.</Popup>
          </Marker>
        );
      });
    }

    return null;
  }, [points, theme]);

  return (
    <MapWrapper
      minZoom={5}
      maxZoom={15}
      maxBounds={[
        [-20.483177, -82.582582],
        [10.511898, -46.591429],
      ]}
    >
      <TileLayer
        url="https://storage.googleapis.com/ora-otca/water/period/{z}/{x}/{y}.png"
        opacity={0.5}
      />
      {markers}
    </MapWrapper>
  );
}
