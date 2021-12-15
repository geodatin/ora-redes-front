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
      <Typography variant="h1"> {t('helloWorld')} </Typography>
      <Typography variant="h1"> Heading 1</Typography>
      <Typography variant="h2"> Heading 2</Typography>
      <Typography variant="h3"> Heading 3</Typography>
      <Typography variant="p">
        Consequat duis amet labore adipisicing ipsum consectetur dolore sint
        excepteur elit fugiat. Qui duis nisi nisi esse veniam. Nostrud irure
        magna labore aliqua in enim culpa ad esse est. Reprehenderit cupidatat
        do est reprehenderit quis commodo. Id laboris quis do mollit sit laboris
        do fugiat.
      </Typography>
      <div>
        <Typography variant="body">Consequat duis amet</Typography>
      </div>
      <Typography variant="caption">Consequat duis amet</Typography>
    </div>
  );
}

export default Dashboard;
