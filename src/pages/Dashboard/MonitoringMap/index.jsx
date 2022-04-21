import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import ShareIcon from '@mui/icons-material/Share';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import L from 'leaflet';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useContextSelector } from 'use-context-selector';

import BluesStationDark from '../../../assets/icons/map/blue-station-dark.png';
import BluesStationLight from '../../../assets/icons/map/blue-station-light.png';
import GrayStationDark from '../../../assets/icons/map/gray-station-dark.png';
import GrayStationLight from '../../../assets/icons/map/gray-station-light.png';
import GreenStationDark from '../../../assets/icons/map/green-station-dark.png';
import GreenStationLight from '../../../assets/icons/map/green-station-light.png';
import OrangeStationDark from '../../../assets/icons/map/orange-station-dark.png';
import OrangeStationLight from '../../../assets/icons/map/orange-station-light.png';
import PurpleStationDark from '../../../assets/icons/map/purple-station-dark.png';
import PurpleStationLight from '../../../assets/icons/map/purple-station-light.png';
import BorderGeojson from '../../../assets/shapes/border.json';
import InverseShape from '../../../assets/shapes/inverseShape.json';
import DataDough from '../../../components/Charts/DataDough';
import CustomButton from '../../../components/CustomButton';
import MapWrapper from '../../../components/MapWrapper';
import MapItem from '../../../components/MapWrapper/Mapitem';
import ShareDialog from '../../../components/ShareDialog';
import Typography from '../../../components/Typography';
import { dataTypes, embedItems, networks } from '../../../constants/options';
import { darkScheme, lightScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import { useAllStations } from '../../../hooks/useAllStations';
import { useDisclaimer } from '../../../hooks/useDisclaimer';
import { useLayoutConfig } from '../../../hooks/useLayoutConfig';
import { useMap } from '../../../hooks/useMap';
import { useMobile } from '../../../hooks/useMobile';
import { useProjectedStations } from '../../../hooks/useProjectedStations';
import { useQuery } from '../../../hooks/useQuery';
import { useStation } from '../../../hooks/useStation';
import { useTimeGrouping } from '../../../hooks/useTimeGrouping';
import api from '../../../services/api';
import useStyles from './styles';

/**
 * This function provides the monitoring map
 * @returns Monitoring Map
 */
export default function MonitoringMap() {
  const autocompleteSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.autocompleteSelection
  );

  const networkSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.networkSelection
  );

  const filters = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.filters
  );

  const generateRoute = useContextSelector(
    FilteringContext,
    (filtering) => filtering.functions.generateRoute
  );

  const { timeGrouping } = useTimeGrouping();
  const { viewProjectedStations, handleOnViewProjectedStations } =
    useProjectedStations();
  const { viewAllStations, handleOnViewAllStations } = useAllStations();

  const { setMapRef } = useMap();
  const { nextLayoutConfig } = useLayoutConfig();
  const { isMobile } = useMobile();
  const { openDisclaimer } = useDisclaimer();
  const { openStation } = useStation();

  const [points, setPoints] = useState();
  const [projectedStations, setProjectedStations] = useState();

  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();
  const [openShare, setOpenShare] = useState(false);
  const query = useQuery();
  const [allStationsList, setAllStationsList] = useState();

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

  useEffect(() => {
    let isSubscribed = true;

    api.get(`/station/projected/location`).then(({ data }) => {
      if (isSubscribed) {
        setProjectedStations(data.features);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

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

  const purpleStation = useMemo(
    () =>
      L.icon({
        iconUrl: theme === darkScheme ? PurpleStationDark : PurpleStationLight,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    [theme]
  );

  useEffect(() => {
    api.get('/station/all/location').then(({ data }) => {
      setAllStationsList(data);
    });
  }, []);

  const allStationsMarkers = useMemo(() => {
    if (allStationsList) {
      return allStationsList.features.map((point, index) => {
        if (!point.geometry || !point.properties) return null;

        const key = `${point?.properties.code}-${index}`;
        const position = [...point.geometry.coordinates];
        position.reverse();
        const icon = purpleStation;

        return (
          <Marker
            key={key}
            position={position}
            icon={icon}
            zIndexOffset={point.properties.situation === 'alert' ? 10 : 2}
          >
            <Popup
              key={theme === darkScheme ? `${key}-dark` : `${key}-light`}
              className={classes.popup}
            >
              <Typography variant="caption" format="bold">
                {point.properties.name}
              </Typography>
            </Popup>
          </Marker>
        );
      });
    }

    return null;
  }, [allStationsList, theme]);

  const allStations = useMemo(() => {
    if (allStationsMarkers && viewAllStations) {
      return (
        <MarkerClusterGroup
          spiderfyDistanceMultiplier={1}
          showCoverageOnHover={false}
        >
          {allStationsMarkers}
        </MarkerClusterGroup>
      );
    }

    return null;
  }, [viewAllStations, theme]);

  const markers = useMemo(() => {
    if (points) {
      let newPoints = [...points];
      if (projectedStations && viewProjectedStations) {
        newPoints = [...points, ...projectedStations];
      }

      return newPoints.map((point, index) => {
        if (viewAllStations) return null;
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

        if (point.properties.isProjected) icon = grayStation;

        return (
          <Marker
            key={key}
            position={position}
            icon={icon}
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

              {point.properties.lastUpdate && (
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    {t('specific.popup.lastUpdate')}
                  </Typography>
                  <Typography variant="caption">
                    {t('general.date.dayMonthYear', {
                      date: new Date(point.properties.lastUpdate),
                    })}
                  </Typography>
                </div>
              )}

              {point.properties.network === 'RHA' && (
                <div
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                    display: 'flex',
                    flexFlow: 'row nowrap',
                  }}
                >
                  <DataDough
                    value={
                      point.properties.rain != null
                        ? `${t('general.number', {
                            value: point.properties.rain,
                          })}`
                        : '-'
                    }
                    sufix={t(`specific.dataType.sufixes.rain`)}
                    label={t(`specific.dataType.variable.items.rain`)}
                    color={dataTypes.variable.colors.rain}
                    scale={0.5}
                  />
                  <DataDough
                    value={
                      point.properties.level != null
                        ? `${t('general.number', {
                            value: point.properties.level,
                          })}`
                        : '-'
                    }
                    sufix={t(`specific.dataType.sufixes.level`)}
                    label={t(`specific.dataType.variable.items.level`)}
                    color={dataTypes.variable.colors.level}
                    scale={0.5}
                  />
                  <DataDough
                    value={
                      point.properties.flowRate != null
                        ? `${t('general.number', {
                            value: point.properties.flowRate,
                          })}`
                        : '-'
                    }
                    sufix={t(`specific.dataType.sufixes.flowRate`)}
                    label={t('specific.dataType.variable.items.flowRate')}
                    color={dataTypes.variable.colors.flowRate}
                    scale={0.5}
                  />
                </div>
              )}

              {point.properties.hasData && (
                <>
                  <div className={classes.separator} />
                  <CustomButton
                    mini
                    style={{ fontWeigth: 400, marginTop: 3, width: '100%' }}
                    onClick={() => {
                      api
                        .post(
                          `/observation/list/${timeGrouping}`,
                          {
                            filters: {
                              ...filters,
                              network: [point.properties.network],
                            },
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
  }, [
    points,
    theme,
    projectedStations,
    viewProjectedStations,
    viewAllStations,
  ]);

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

  const embedEnabled = useMemo(() => {
    if (window.location.pathname === '/embed') {
      const embedingParam = query.get('embeding');

      if (embedingParam === 'false') {
        return false;
      }

      return true;
    }

    return true;
  }, []);

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
      itemLayers={
        <MapItem
          popupContent={
            <div style={{ paddingLeft: 10 }}>
              <div className={classes.legendItem}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: 18,
                          },
                        }}
                        checked={viewProjectedStations}
                        onChange={handleOnViewProjectedStations}
                      />
                    }
                    label={
                      <Typography variant="caption">
                        {t('specific.layers.projectedStations')}
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: 18,
                          },
                        }}
                        checked={viewAllStations}
                        onChange={handleOnViewAllStations}
                      />
                    }
                    label={
                      <Typography variant="caption">
                        {t('specific.layers.allStations')}
                      </Typography>
                    }
                  />
                </FormGroup>
              </div>
            </div>
          }
          onClick={() => {}}
        >
          <LayersRoundedIcon style={{ fontSize: 20 }} />
        </MapItem>
      }
      itemAbout={
        <MapItem onClick={() => openDisclaimer()}>
          <InfoOutlinedIcon style={{ fontSize: 20 }} />
        </MapItem>
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
            embedEnabled={embedEnabled}
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
                {t('specific.legend.territoryLine')}
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
      {allStations}
    </MapWrapper>
  );
}
