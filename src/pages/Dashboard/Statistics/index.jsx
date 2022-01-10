import faker from 'faker';
import React, { useState } from 'react';
import { useTheme } from 'react-jss';

import BarChart from '../../../components/Charts/Bar';
import DoughnutChart from '../../../components/Charts/Doughnut';
import LineChart from '../../../components/Charts/Line';
import RankingChart from '../../../components/Charts/Ranking';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

/**
 * This function provides a statistics list
 * @returns statistics list
 */
export default function Statistics() {
  const theme = useTheme();

  const [page, setRankingPage] = useState(1);
  const [data /* setData */] = useState({
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: [theme.primary.main],
        borderColor: [theme.primary.main],
        borderRadius: 5,
        barThickness: 15,
      },
    ],
  });

  const [doughnutData /* setData */] = useState({
    labels: ['Fulll', 'Empty'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [80, 20],
        backgroundColor: [theme.primary.main, theme.neutral.gray.light],
        borderColor: [theme.primary.main, theme.neutral.gray.light],
      },
    ],
  });

  return (
    <ul>
      <LineChart title="Line chart" info="This is a line chart" data={data} />

      <RankingChart
        title="Ranking chart"
        info="This is a ranking chart"
        data={data}
        totalPages={5}
        page={page}
        setRankingPage={setRankingPage}
      />

      <BarChart
        title="Horizontal bar chart"
        info="This is a horizontal bar chart"
        data={data}
      />

      <BarChart
        title="Vertical bar chart"
        info="This is a vertical bar chart"
        data={data}
        options={{ indexAxis: 'x' }}
      />

      <DoughnutChart
        title="Doughnut chart"
        info="This is a doughnut chart"
        data={doughnutData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </ul>
  );
}
