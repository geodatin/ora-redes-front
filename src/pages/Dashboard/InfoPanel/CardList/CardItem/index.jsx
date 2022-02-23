/* eslint-disable no-unused-vars */
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import MiddleDoughnut from '../../../../../components/Charts/MiddleDoughnut';
import CustomButton from '../../../../../components/CustomButton';
import ListItemContainer from '../../../../../components/ListItemContainer';
import Typography from '../../../../../components/Typography';
import { dataTypes } from '../../../../../constants/options';
import MapContext from '../../../../../contexts/mapping';
import NavigationContext from '../../../../../contexts/navigation';
import useStyles from './styles';

/**
 * This component provides a station card item
 * @returns station card item
 */
export default function CardItem({ item, disableMoreStatisticsButton }) {
  CardItem.propTypes = {
    item: PropTypes.shape().isRequired,
    disableMoreStatisticsButton: PropTypes.bool,
  };

  CardItem.defaultProps = {
    disableMoreStatisticsButton: false,
  };

  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    functions: { openStation },
  } = useContext(NavigationContext);

  const {
    functions: { panOnMap },
  } = useContext(MapContext);

  function dataDough(key, value, sufix, label, color) {
    return (
      <div key={key} style={{ marginRight: 10, scrollSnapAlign: 'end' }}>
        <MiddleDoughnut
          style={{ width: 125 }}
          description={label}
          doughnut={
            <Doughnut
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
                    callbacks: {
                      label(context) {
                        return `${context.dataset.value} ${context.dataset.sufix} (${context.parsed}%)`;
                      },
                    },
                  },
                },
                aspectRatio: 1,
                radius: '100%',
                cutout: 55,
                rotation: 180,
              }}
              data={{
                labels: ['', ''],
                datasets: [
                  {
                    label,
                    value,
                    sufix,
                    data: [100, 0],
                    backgroundColor: [color, theme.toggleButton.unabled],
                    borderColor: 'transparent',
                  },
                ],
              }}
            />
          }
        >
          <Typography format="bold" variant="p">
            {t('general.number', { value }) || '-'}
          </Typography>
          <Typography variant="body" style={{ color: theme.neutral.gray.main }}>
            {sufix}
          </Typography>
        </MiddleDoughnut>
      </div>
    );
  }

  const handleOnClickLocation = () => {
    panOnMap([item.location.coordinates[1], item.location.coordinates[0]]);
  };

  const doughsRef = useRef();

  useEffect(() => {
    const { current } = doughsRef;

    const onWindowResize = () => {
      if (current.scrollWidth <= current.clientWidth) {
        current.style.justifyContent = 'space-around';
      } else {
        current.style.justifyContent = 'flex-start';
      }
    };

    window.addEventListener('resize', onWindowResize);
  }, []);

  return (
    <ListItemContainer isLoaded={!!item}>
      <div className={classes.cardHeader}>
        <div style={{ display: 'flex' }}>
          <Typography
            style={{ color: theme.secondary.dark }}
            variant="p"
            format="bold"
          >
            {item.name}
          </Typography>
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleOnClickLocation()}
            onKeyDown={() => handleOnClickLocation()}
            className={classes.locationButton}
          >
            <MyLocationIcon style={{ fontSize: 18 }} />
          </div>
        </div>

        <Typography style={{ color: theme.secondary.dark }} variant="caption">
          {t('specific.infoPanel.lastUpdate')}{' '}
          {t('general.date.dayMonthYearHour', {
            date: new Date(item.lastUpdate),
          })}
        </Typography>
      </div>

      <div ref={doughsRef} className={classes.doughnuts}>
        {item?.observations?.map((observation) =>
          dataDough(
            observation.key,
            observation.value,
            t(`specific.dataType.sufixes.${observation.key}`),
            t(`specific.dataType.variable.items.${observation.key}`),
            dataTypes.variable.colors[observation.key]
          )
        )}
      </div>

      {!disableMoreStatisticsButton && (
        <CustomButton
          style={{
            width: '100%',
            height: 30,
            backgroundColor: theme.toggleButton.unabled,
            textTransform: 'none',
            color: theme.neutral.gray.main,
          }}
          disabled={false}
          onClick={() => openStation(item)}
        >
          {t('specific.list.seeMoreStatistics')}
        </CustomButton>
      )}
    </ListItemContainer>
  );
}
