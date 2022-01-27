import MyLocationIcon from '@mui/icons-material/MyLocation';
import PropTypes from 'prop-types';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import MiddleDoughnut from '../../../../../components/Charts/MiddleDoughnut';
import CustomButton from '../../../../../components/CustomButton';
import ListItemContainer from '../../../../../components/ListItemContainer';
import Typography from '../../../../../components/Typography';
import useStyles from './styles';

/**
 * This component provides a station card item
 * @returns station card item
 */
export default function CardItem({ item }) {
  CardItem.propTypes = {
    item: PropTypes.shape().isRequired,
  };

  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  function dataDough(value, sufix, description, color) {
    return (
      <MiddleDoughnut
        style={{ width: 110 }}
        description={description}
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
                      return `${context.dataset.value} ${context.dataset.label} (${context.parsed}%)`;
                    },
                  },
                },
              },
              aspectRatio: 1,
              radius: '100%',
              cutout: 47,
              rotation: 180,
            }}
            data={{
              labels: ['', ''],
              datasets: [
                {
                  label: sufix,
                  value,
                  data: [80, 20],
                  backgroundColor: [color, theme.toggleButton.unabled],
                  borderColor: 'transparent',
                },
              ],
            }}
          />
        }
      >
        <Typography format="bold" variant="h3">
          {value || '-'}
        </Typography>
        <Typography variant="body" style={{ color: theme.neutral.gray.main }}>
          {sufix}
        </Typography>
      </MiddleDoughnut>
    );
  }

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
            onClick={() => {}}
            onKeyDown={() => {}}
            className={classes.locationButton}
          >
            <MyLocationIcon style={{ fontSize: 18 }} />
          </div>
        </div>

        <Typography style={{ color: theme.secondary.dark }} variant="caption">
          {t('specific.infoPanel.lastUpdate')}{' '}
          {t('general.date.complete', {
            date: new Date(item.timestamp),
          })}
        </Typography>
      </div>
      <div className={classes.doughnuts}>
        {dataDough(
          item?.rain,
          'mm',
          t('specific.dataType.variable.items.rain'),
          theme.blue.main
        )}
        {dataDough(
          item?.level,
          'cm',
          t('specific.dataType.variable.items.adoptedLevel'),
          theme.primary.main
        )}
        {dataDough(
          item?.flowRate,
          'm³/s',
          t('specific.dataType.variable.items.flowRate'),
          theme.green.dark
        )}
      </div>
      <CustomButton
        style={{
          width: '100%',
          height: 30,
          backgroundColor: theme.toggleButton.unabled,
          textTransform: 'none',
          color: theme.neutral.gray.main,
        }}
        disabled={false}
        onClick={() => {}}
      >
        <Typography>{t('specific.list.seeMoreStatistics')}</Typography>
      </CustomButton>
    </ListItemContainer>
  );
}
