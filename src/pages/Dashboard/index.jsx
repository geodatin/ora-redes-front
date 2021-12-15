/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header';
import Typography from '../../components/Typography';
import useStyles from './styles';

function Dashboard() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.mainRow}>
        <div className={classes.notifications}>Notifications</div>
        <div className={classes.map}>Map</div>
        <div className={classes.statistics}>Statistics</div>
      </div>
    </div>
  );
}

export default Dashboard;
