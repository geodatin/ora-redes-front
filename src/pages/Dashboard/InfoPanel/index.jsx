import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import CustomToggleButton from '../../../components/CustomToggleButton';
import VLayout from '../../../components/Layout/Vertical';
import TabPanel from '../../../components/TabPanel';
import Typography from '../../../components/Typography';
import { panels, timeGroupingOptions } from '../../../constants/options';
import { usePanel } from '../../../hooks/usePanel';
import { useStation } from '../../../hooks/useStation';
import { useTimeGrouping } from '../../../hooks/useTimeGrouping';
import CardList from './CardList';
import Station from './Station';
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

  const { station } = useStation();
  const { panelIndexValue, handleOnChangePanel } = usePanel();

  const { timeGrouping, timeGroupingIndexValue, handleOnChangeTimeGrouping } =
    useTimeGrouping();

  const timeGroupingVisibility =
    (panelIndexValue === panels.list.index ||
      panelIndexValue === panels.station.index) &&
    station?.network === 'RHA';

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
                t(panels.statistics.translation),
                t(panels.list.translation),
              ]}
              value={
                panelIndexValue === panels.station.index
                  ? panels.list.index
                  : panelIndexValue
              }
              handleChange={handleOnChangePanel}
              style={{ marginTop: 10 }}
            />
            {timeGroupingVisibility && (
              <CustomToggleButton
                options={timeGroupingOptions.map((option) =>
                  t(option.translation)
                )}
                value={timeGroupingIndexValue}
                handleChange={handleOnChangeTimeGrouping}
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
              <CardList timeGrouping={timeGrouping} />
            </TabPanel>
            {station && (
              <TabPanel value={panelIndexValue} index={panels.station.index}>
                <Station station={station} timeGrouping={timeGrouping} />
              </TabPanel>
            )}
          </>
        ),
      }}
    />
  );
}
