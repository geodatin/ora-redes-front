import faker from 'faker';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useTheme } from 'react-jss';

import ChartContainer from '../../../components/ChartContainer';

/**
 * This funcion provides a statistics list
 * @returns statistics list
 */
export default function Statistics() {
  const theme = useTheme();

  const optionsHorizontalBar = {
    indexAxis: 'y',
    plugins: {
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  const optionsVerticalBar = {
    indexAxis: 'x',
    plugins: {},
  };

  const optionsLine = {
    indexAxis: 'x',
    plugins: {},
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: theme.primary.main,
        borderColor: theme.primary.main,
        borderRadius: 5,
        barThickness: 15,
      },
    ],
  };

  return (
    <ul>
      <ChartContainer
        title="Gráfico de linhas"
        info="Este é um gráfico de linhas"
      >
        <Line options={optionsLine} data={data} />
      </ChartContainer>
      <ChartContainer
        title="Gráfico de barras horizontais"
        info="Este é um gráfico de barras horizontais"
      >
        <Bar
          style={{ marginTop: -10 }}
          options={optionsHorizontalBar}
          data={data}
        />
      </ChartContainer>
      <ChartContainer
        title="Gráfico de barras verticais"
        info="Este é um gráfico de barras verticais"
      >
        <Bar options={optionsVerticalBar} data={data} />
      </ChartContainer>
    </ul>
  );
}
