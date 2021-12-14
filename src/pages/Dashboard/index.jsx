import React from 'react';

import CustomTypography from '../../components/CustomTypography';
import useStyles from './styles';

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <CustomTypography variant="h1"> Heading 1</CustomTypography>
      <CustomTypography variant="h2"> Heading 2</CustomTypography>
      <CustomTypography variant="h3"> Heading 3</CustomTypography>
    </div>
  );
}

export default Dashboard;
