/* eslint-disable no-unused-vars */
import L from 'leaflet';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';

import BluesStationDark from '../../../assets/icons/map/blue-station-dark.png';
import BluesStationLight from '../../../assets/icons/map/blue-station-light.png';
import GrayStationDark from '../../../assets/icons/map/gray-station-dark.png';
import GrayStationLight from '../../../assets/icons/map/gray-station-light.png';
import GreenStationDark from '../../../assets/icons/map/green-station-dark.png';
import GreenStationLight from '../../../assets/icons/map/green-station-light.png';
import OrangeStationDark from '../../../assets/icons/map/orange-station-dark.png';
import OrangeStationLight from '../../../assets/icons/map/orange-station-light.png';
import BorderGeojson from '../../../assets/shapes/border.json';
import InverseShape from '../../../assets/shapes/inverseShape.json';
import MapWrapper from '../../../components/MapWrapper';
import Typography from '../../../components/Typography';
import { networks } from '../../../constants/options';
import { darkScheme, lightScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import api from '../../../services/api';
import useStyles from './styles';

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
  const classes = useStyles();
  const { t } = useTranslation();

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
            <Popup
              key={theme === darkScheme ? `${key}-dark` : `${key}-light`}
              className={classes.popup}
            >
              <Typography variant="caption" format="bold">
                {point.properties.name}
              </Typography>
              <div className={classes.separator} />
              {point.properties.country && (
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    {t('specific.popup.country')}
                  </Typography>
                  <Typography variant="caption">
                    {point.properties.country}
                  </Typography>
                </div>
              )}
              {point.properties.network && (
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    {t('specific.popup.country')}
                  </Typography>
                  <Typography variant="caption">
                    {point.properties.network}
                  </Typography>
                </div>
              )}
              {point.properties.responsible && (
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    {t('specific.popup.responsible')}
                  </Typography>
                  <Typography variant="caption">
                    {point.properties.responsible}
                  </Typography>
                </div>
              )}
              {point.properties.river && (
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    {t('specific.popup.river')}
                  </Typography>
                  <Typography variant="caption">
                    {point.properties.river}
                  </Typography>
                </div>
              )}
            </Popup>
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
        [-28.483177, -100.582582],
        [14.211898, -30.591429],
      ]}
    >
      <GeoJSON
        data={InverseShape}
        style={() => ({
          stroke: false,
          fillColor: theme === darkScheme ? 'black' : lightScheme.stroke.light,
          fillOpacity: theme === darkScheme ? 0.5 : 0.7,
        })}
      />
      <GeoJSON
        data={BorderGeojson}
        style={() => ({
          fillColor: 'transparent',
          weight: 2,
          dashArray: 8,
          lineCap: 'round',
          lineJoin: 'round ',
          color: theme === darkScheme ? '#accc0c' : '#728740',
        })}
      />
      <TileLayer
        url="https://storage.googleapis.com/ora-otca/water/period/{z}/{x}/{y}.png"
        opacity={0.7}
        zIndex={2}
      />
      {markers}
    </MapWrapper>
  );
}
