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
      <CustomTypography variant="p">
        Consequat duis amet labore adipisicing ipsum consectetur dolore sint
        excepteur elit fugiat. Qui duis nisi nisi esse veniam. Nostrud irure
        magna labore aliqua in enim culpa ad esse est. Reprehenderit cupidatat
        do est reprehenderit quis commodo. Id laboris quis do mollit sit laboris
        do fugiat.
      </CustomTypography>
      <div>
        <CustomTypography variant="body">Consequat duis amet</CustomTypography>
      </div>
      <CustomTypography variant="caption">Consequat duis amet</CustomTypography>
    </div>
  );
}

export default Dashboard;
