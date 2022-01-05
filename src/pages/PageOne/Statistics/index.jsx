import faker from 'faker';
import React, { useState } from 'react';
import { useTheme } from 'react-jss';

import BarChart from '../../../components/Charts/Bar';
import LineChart from '../../../components/Charts/Line';
import RankingChart from '../../../components/Charts/Ranking';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

/**
 * This funcion provides a statistics list
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
        backgroundColor: theme.primary.main,
        borderColor: theme.primary.main,
        borderRadius: 5,
        barThickness: 15,
      },
    ],
  });

  return (
    <ul>
      <LineChart
        title="Gráfico de linhas"
        info="Este é um gráfico de linhas"
        data={data}
      />

      <RankingChart
        title="Gráfico de ranking"
        info="Este é um gráfico de ranking"
        data={data}
        totalPages={5}
        page={page}
        setRankingPage={setRankingPage}
      />

      <BarChart
        title="Gráfico de barras horizontais"
        info="Este é um gráfico de barras horizontais"
        data={data}
      />

      <BarChart
        title="Gráfico de barras verticais"
        info="Este é um gráfico de verticais"
        data={data}
        options={{ indexAxis: 'x' }}
      />
    </ul>
  );
}
