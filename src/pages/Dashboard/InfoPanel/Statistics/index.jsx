import faker from 'faker';
import React, { useState } from 'react';
import { useTheme } from 'react-jss';

import BarChart from '../../../../components/Charts/Bar';
import DoughnutChart from '../../../../components/Charts/Doughnut';
import ItemsChart from '../../../../components/Charts/Items';
import LegendDoughnutChart from '../../../../components/Charts/LegendDoughnut';
import LineChart from '../../../../components/Charts/Line';
import RankingChart from '../../../../components/Charts/Ranking';

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

  const [legendDoughnutData /* setData */] = useState({
    labels: [
      'Legend data 1',
      'Legend data 2',
      'Legend data 3',
      'Legend data 4',
    ],
    datasets: [
      {
        label: 'Datatype',
        data: [123, 102, 93, 84],
        backgroundColor: [
          theme.blue.main,
          theme.primary.main,
          theme.green.main,
          theme.secondary.light,
        ],
        borderColor: 'transparent',
      },
    ],
  });

  const [itemsData /* setData */] = useState({
    labels: [
      'Legend data 1',
      'Legeng data 2',
      'Legend data 3',
      'Legend data 4',
    ],
    datasets: [
      {
        label: 'datatype',
        data: [123, 102, 93, 84],
        icons: [
          <div
            style={{
              height: 20,
              width: 30,
              background: 'brown',
              borderRadius: 5,
              marginRight: 10,
            }}
          />,
          <div
            style={{
              height: 20,
              width: 30,
              background: 'blue',
              borderRadius: 5,
              marginRight: 10,
            }}
          />,
          <div
            style={{
              height: 20,
              width: 30,
              background: 'red',
              borderRadius: 5,
              marginRight: 10,
            }}
          />,
          <div
            style={{
              height: 20,
              width: 30,
              background: 'green',
              borderRadius: 5,
              marginRight: 10,
            }}
          />,
        ],
      },
    ],
  });

  return (
    <ul>
      <LegendDoughnutChart
        title="Legend doughnut chart"
        info="This is a legend custom doughnut chart"
        data={legendDoughnutData}
      />

      <ItemsChart
        title="Items chart"
        info="This is a items chart"
        data={itemsData}
      />

      <RankingChart
        title="Ranking chart"
        info="This is a ranking chart"
        data={data}
        totalPages={5}
        page={page}
        setRankingPage={setRankingPage}
      />

      <LineChart title="Line chart" info="This is a line chart" data={data} />

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
