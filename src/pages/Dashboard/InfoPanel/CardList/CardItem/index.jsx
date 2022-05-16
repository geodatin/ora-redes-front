import MyLocationIcon from '@mui/icons-material/MyLocation';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import DataDough from '../../../../../components/Charts/DataDough';
import CustomButton from '../../../../../components/CustomButton';
import ListItemContainer from '../../../../../components/ListItemContainer';
import Typography from '../../../../../components/Typography';
import { dataTypes } from '../../../../../constants/options';
import { useMap } from '../../../../../hooks/useMap';
import { useStation } from '../../../../../hooks/useStation';
import { useTimeGrouping } from '../../../../../hooks/useTimeGrouping';
import useStyles from './styles';

/**
 * This component provides a station card item
 * @returns station card item
 */
function CardItemComponent({ item, disableMoreStatisticsButton }) {
  CardItemComponent.propTypes = {
    item: PropTypes.shape().isRequired,
    disableMoreStatisticsButton: PropTypes.bool,
  };

  CardItemComponent.defaultProps = {
    disableMoreStatisticsButton: false,
  };

  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const { openStation } = useStation();
  const { panOnMap } = useMap();
  const { timeGrouping } = useTimeGrouping();

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
    onWindowResize();

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
        {item?.observations?.map((observation) => {
          const sufix =
            observation?.mode === 'sum'
              ? `${t(`specific.dataType.sufixes.${observation.key}`)}/${t(
                  `specific.infoPanel.timeGrouping.${timeGrouping}`
                ).toLowerCase()}`
              : t(`specific.dataType.sufixes.${observation.key}`);

          return (
            <DataDough
              key={observation.key}
              value={t('general.number', { value: observation.value }) || '-'}
              sufix={sufix}
              label={t(`specific.dataType.variable.items.${observation.key}`)}
              color={dataTypes.variable.colors[observation.key]}
            />
          );
        })}
      </div>

      {!disableMoreStatisticsButton && (
        <CustomButton
          style={{
            width: '100%',
            height: 30,
            backgroundColor: theme.toggleButton.unabled,
            textTransform: 'none',
            color: theme.secondary.dark,
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

export const CardItem = React.memo(CardItemComponent);
