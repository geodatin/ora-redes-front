import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
              options={['Statistics', 'List']}
              value={panel}
              handleChange={handleChangePanel}
              style={{ marginTop: 10 }}
            />
            <CustomToggleButton
              options={[
                'Year',
                'Semester',
                'Quarter',
                'Month',
                'Day',
                'Week',
                'Hour',
              ]}
              value={timeGrouping}
              handleChange={handleChangeTimeGrouping}
              style={{ marginTop: 20 }}
              typographyVariant="caption"
            />
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
