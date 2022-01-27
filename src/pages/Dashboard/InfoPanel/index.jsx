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

  const [panel, setPanel] = useState(0);
  const [timeGrouping, setTimeGrouping] = useState(0);

  const handleChangePanel = (event, newPanel) => {
    if (newPanel !== null) {
      setPanel(newPanel);
    }
  };

  const handleChangeTimeGrouping = (event, newTimeGrouping) => {
    if (newTimeGrouping !== null) {
      setTimeGrouping(newTimeGrouping);
    }
  };

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
              options={[
                t('specific.infoPanel.statistics'),
                t('specific.infoPanel.list'),
              ]}
              value={panel}
              handleChange={handleChangePanel}
              style={{ marginTop: 10 }}
            />
            {panel === 1 && (
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
            <TabPanel value={panel} index={0}>
              <Statistics />
            </TabPanel>
            <TabPanel value={panel} index={1}>
              <CardList />
            </TabPanel>
          </>
        ),
      }}
    />
  );
}
