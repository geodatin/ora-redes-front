/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header';
import Typography from '../../components/Typography';
import { layout } from '../../constants/constraints';
import useStyles from './styles';

function Dashboard() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.wrapper}>
      <Header
        items={[
          { title: 'Page', to: '/page' },
          { title: 'Page 2', to: '/page2' },
          { title: 'Page 3', to: '/page3' },
        ]}
      />
      <div className={classes.mainRow}>
        {layout.leftColumn.enabled && (
          <div className={classes.leftColumn}>Left column</div>
        )}

        <div className={classes.mapContainer}>Map container</div>

        {layout.rightColumn.enabled && (
          <div className={classes.rightColumn}>Right column</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
