import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import CustomToggleButton from '../../../components/CustomToggleButton';
import VLayout from '../../../components/Layout/Vertical';
import TabPanel from '../../../components/TabPanel';
import Typography from '../../../components/Typography';
import CardList from './CardList';
import Statistics from './Statistics';
import useStyles from './styles';

/**
 * This function provides a info panel
 * @returns info panel
 */
export default function InfoPanel({ title, subtitle }) {
  InfoPanel.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  };

  InfoPanel.defaultProps = {
    subtitle: undefined,
  };

  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const panels = {
    statistics: {
      index: 0,
      translation: t('specific.infoPanel.statistics'),
    },
    list: {
      index: 1,
      translation: t('specific.infoPanel.list'),
    },
    station: {
      index: 2,
      translation: undefined,
    },
  };

  const [panelIndexValue, setPanelIndexValue] = useState(
    panels.statistics.index
  );
  const [timeGrouping, setTimeGrouping] = useState(0);

  const handleChangePanel = (event, newPanel) => {
    if (newPanel !== null) {
      setPanelIndexValue(newPanel);
    }
  };

  const handleChangeTimeGrouping = (event, newTimeGrouping) => {
    if (newTimeGrouping !== null) {
      setTimeGrouping(newTimeGrouping);
    }
  };

  const timeGroupingVisibility =
    panelIndexValue === panels.list.index ||
    panelIndexValue === panels.station.index;

  return (
    <VLayout
      upRow={{
        className: classes.headerWrapper,
        children: (
          <>
            <Typography style={{ marginTop: 10, lineHeight: 0.5 }} variant="h3">
              {title}
            </Typography>
            {subtitle && (
              <Typography
                style={{ color: theme.neutral.gray.main, lineHeight: 0.5 }}
                variant="caption"
              >
                {subtitle}
              </Typography>
            )}
            <CustomToggleButton
              options={[panels.statistics.translation, panels.list.translation]}
              value={
                panelIndexValue === panels.station.index
                  ? panels.list.index
                  : panelIndexValue
              }
              handleChange={handleChangePanel}
              style={{ marginTop: 10 }}
            />
            {timeGroupingVisibility && (
              <CustomToggleButton
                options={[
                  t('specific.infoPanel.timeGrouping.year'),
                  t('specific.infoPanel.timeGrouping.quarter'),
                  t('specific.infoPanel.timeGrouping.month'),
                  t('specific.infoPanel.timeGrouping.day'),
                  t('specific.infoPanel.timeGrouping.week'),
                  t('specific.infoPanel.timeGrouping.hour'),
                ]}
                value={timeGrouping}
                handleChange={handleChangeTimeGrouping}
                style={{ marginTop: 20 }}
                typographyVariant="caption"
              />
            )}
          </>
        ),
      }}
      mainContainer={{
        className: classes.panelWrapper,
        children: (
          <>
            <TabPanel value={panelIndexValue} index={panels.statistics.index}>
              <Statistics />
            </TabPanel>
            <TabPanel value={panelIndexValue} index={panels.list.index}>
              <CardList />
            </TabPanel>
            <TabPanel value={panelIndexValue} index={panels.station.index}>
              <div>Station data</div>
            </TabPanel>
          </>
        ),
      }}
    />
  );
}
