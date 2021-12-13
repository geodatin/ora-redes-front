import React from 'react';

import useStyles from './styles';

function Dashboard() {
  const classes = useStyles();

  return <div className={classes.wrapper}>Hello world</div>;
}

export default Dashboard;
