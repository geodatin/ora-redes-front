import useStyles from './styles';
import React from 'react';

export default function Dashboard() {
  const classes = useStyles();
  return <div className={classes.wrapper}>Hello world</div>;
}
