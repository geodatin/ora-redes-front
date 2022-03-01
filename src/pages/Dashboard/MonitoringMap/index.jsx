import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import ShareIcon from '@mui/icons-material/Share';
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
import CustomButton from '../../../components/CustomButton';
import MapWrapper from '../../../components/MapWrapper';
import MapItem from '../../../components/MapWrapper/Mapitem';
import ShareDialog from '../../../components/ShareDialog';
import Typography from '../../../components/Typography';
import { embedItems, networks } from '../../../constants/options';
import { darkScheme, lightScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import MapContext from '../../../contexts/mapping';
import NavigationContext from '../../../contexts/navigation';
import api from '../../../services/api';
import useStyles from './styles';

/**
 * This function provides the monitoring map
 * @returns Monitoring Map
 */
export default function MonitoringMap() {
  const {
    values: { filters, timeGrouping, autocompleteSelection, networkSelection },
    functions: { generateRoute },
  } = useContext(FilteringContext);

  const {
    setters: { setMapRef },
    functions: { nextLayoutConfig },
  } = useContext(MapContext);

  const {
    values: { isMobile },
    functions: { openStation },
  } = useContext(NavigationContext);

  const [points, setPoints] = useState();
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();
  const [openShare, setOpenShare] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    api.post(`/station/location`, { filters }).then(({ data }) => {
      if (isSubscribed) {
        setPoints(data.features);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [filters]);

  const blueStation = useMemo(
    () =>
      L.icon({
        iconUrl: theme === darkScheme ? BluesStationDark : BluesStationLight,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    [theme]
  );

  const blueStationPulsing = useMemo(
    () =>
      L.divIcon({
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: classes.bluePulsatingCircle,
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

  const greenStationPulsing = useMemo(
    () =>
      L.divIcon({
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: classes.greenPulsatingCircle,
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

  const grayStationPulsing = useMemo(
    () =>
      L.divIcon({
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: classes.grayPulsatingCircle,
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

  const orangeStationPulsing = useMemo(
    () =>
      L.divIcon({
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: classes.orangePulsatingCircle,
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

        if (point.properties.situation === 'alert') {
          if (point.properties.network === networks.RHA.code) {
            icon = blueStationPulsing;
          } else if (point.properties.network === networks.RQA.code) {
            icon = orangeStationPulsing;
          } else if (point.properties.network === networks.HYBAM.code) {
            icon = greenStationPulsing;
          } else {
            icon = grayStationPulsing;
          }
        } else if (point.properties.network === networks.RHA.code) {
          icon = blueStation;
        } else if (point.properties.network === networks.RQA.code) {
          icon = orangeStation;
        } else if (point.properties.network === networks.HYBAM.code) {
          icon = greenStation;
        } else {
          icon = grayStation;
        }

        return (
          <Marker
            key={key}
            position={position}
            icon={icon}
            riseOnHover
            zIndexOffset={point.properties.situation === 'alert' ? 10 : 2}
          >
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
                    {t('specific.popup.network')}
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

              {point.properties.hasData && (
                <>
                  <div className={classes.separator} />
                  <CustomButton
                    mini
                    style={{ fontWeigth: 400, marginTop: 3 }}
                    onClick={() => {
                      api
                        .post(
                          `/observation/list/${timeGrouping}`,
                          {
                            filters,
                          },
                          { params: { stationCode: point.properties.code } }
                        )
                        .then(({ data }) => {
                          if (data) {
                            openStation(data);
                          }
                        });
                    }}
                  >
                    {t('specific.popup.viewMoreButton')}
                  </CustomButton>
                </>
              )}
            </Popup>
          </Marker>
        );
      });
    }

    return null;
  }, [points, theme]);

  function handleShareDialog() {
    setOpenShare(!openShare);
  }

  const embedCustomParam = useMemo(
    () => generateRoute(''),
    [networkSelection, autocompleteSelection]
  );

  const shareUrl = useMemo(
    () => window.location.origin + generateRoute(`/filter?`),
    [networkSelection, autocompleteSelection]
  );

  return (
    <MapWrapper
      getMapRef={(ref) => setMapRef(ref)}
      minZoom={5}
      maxZoom={15}
      maxBounds={[
        [-28.483177, -100.582582],
        [14.211898, -30.591429],
      ]}
      itemTopChildren={
        !isMobile ? (
          <MapItem onClick={() => nextLayoutConfig()}>
            <AspectRatioRoundedIcon style={{ fontSize: 20 }} />
          </MapItem>
        ) : undefined
      }
      itemChildren={
        <>
          <MapItem onClick={() => handleShareDialog()}>
            <ShareIcon style={{ fontSize: 18 }} />
          </MapItem>
          <ShareDialog
            open={openShare}
            onClose={() => setOpenShare(false)}
            url={shareUrl}
            shareMessage={t('specific.share.message')}
            setOpen={setOpenShare}
            embedItems={embedItems}
            customParam={embedCustomParam}
          />
        </>
      }
      itemBottomChildren={
        <MapItem
          popupContent={
            <div className={classes.legendContent}>
              <div className={classes.legendItem}>
                <img
                  alt="blue-station"
                  src={
                    theme === darkScheme ? BluesStationDark : BluesStationLight
                  }
                  className={classes.legendIcon}
                />
                {t('specific.networks.type.hydrologic')}
              </div>
              <div className={classes.legendItem}>
                <img
                  alt="orange-station"
                  src={
                    theme === darkScheme
                      ? OrangeStationDark
                      : OrangeStationLight
                  }
                  className={classes.legendIcon}
                />
                {t('specific.networks.type.quality')}
              </div>
              <div className={classes.legendItem}>
                <img
                  alt="green-station"
                  src={
                    theme === darkScheme ? GreenStationDark : GreenStationLight
                  }
                  className={classes.legendIcon}
                />
                {t('specific.networks.type.hybam')}
              </div>
              <div className={classes.legendItem}>
                <div
                  style={{
                    borderColor: theme === darkScheme ? '#accc0c' : '#728740',
                  }}
                  className={classes.dashedLine}
                />
                {t('specific.networks.type.quality')}
              </div>
              <div className={classes.legendItem}>
                <div
                  style={{
                    borderColor: '#0023FF',
                    borderStyle: 'solid',
                    opacity: theme === darkScheme ? 0.3 : 0.2,
                  }}
                  className={classes.dashedLine}
                />
                {t('specific.legend.riverLine')}
              </div>
              <div className={classes.legendItem}>
                <div className={classes.alertStationLegend} />
                {t('specific.legend.alertStation')}
              </div>
            </div>
          }
        >
          <span
            className={classes.legendBall}
            style={{
              backgroundColor: theme.blue.main,
              height: 17,
              width: 17,
            }}
          >
            <span
              className={classes.legendBall}
              style={{
                backgroundColor: theme.primary.main,
                height: 14,
                width: 14,
              }}
            >
              <span
                className={classes.legendBall}
                style={{
                  backgroundColor: theme.green.main,
                  height: 10,
                  width: 10,
                }}
              />
            </span>
          </span>
        </MapItem>
      }
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
        url="https://storage.googleapis.com/ora-otca/water/drainage/{z}/{x}/{y}.png"
        opacity={theme === darkScheme ? 0.3 : 0.2}
        zIndex={2}
      />
      {markers}
    </MapWrapper>
  );
}
