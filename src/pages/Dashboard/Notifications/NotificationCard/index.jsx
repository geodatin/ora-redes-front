import MyLocationIcon from '@mui/icons-material/MyLocation';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import Typography from '../../../../components/Typography';
import MapContext from '../../../../contexts/mapping';
import useStyles from './styles';

export default function NotificationCard({ circleColor, notification }) {
  NotificationCard.propTypes = {
    notification: PropTypes.shape().isRequired,
    circleColor: PropTypes.string.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    functions: { panOnMap },
  } = useContext(MapContext);

  return (
    <li className={classes.wrapper}>
      <div
        className={classes.circle}
        style={{
          background: circleColor,
        }}
      >
        <Typography variant="h3">!</Typography>
      </div>

      <div style={{ width: '100%' }}>
        <div
          role="button"
          tabIndex={0}
          onClick={() =>
            panOnMap([
              notification.location.coordinates[1],
              notification.location.coordinates[0],
            ])
          }
          onKeyDown={() =>
            panOnMap([
              notification.location.coordinates[1],
              notification.location.coordinates[0],
            ])
          }
          className={classes.locationButton}
        >
          <Typography format="bold" variant="caption">
            {notification.name}
          </Typography>
          <MyLocationIcon style={{ fontSize: 12, marginLeft: 7 }} />
        </div>

        <div className={classes.notificationTextContent}>
          <Typography variant="caption">
            {t(`specific.notifications.state`)} {t(`specific.notifications.of`)}{' '}
            {t(`specific.notifications.situations.${notification.situation}`)}{' '}
            {t(`specific.notifications.afterReaching`)}{' '}
            {t('general.number', { value: notification.value }) || '-'}{' '}
            {t(`specific.dataType.sufixes.${notification.type}`)}{' '}
            {t(`specific.notifications.of`)}{' '}
            {t(
              `specific.dataType.variable.items.${notification.type}`
            ).toLowerCase()}
            .
          </Typography>
        </div>

        <Typography
          style={{ color: theme.neutral.gray.main, lineHeight: 0.5 }}
          variant="caption"
        >
          {t('general.date.complete', {
            date: new Date(notification.lastUpdate),
          })}
        </Typography>
      </div>
    </li>
  );
}
