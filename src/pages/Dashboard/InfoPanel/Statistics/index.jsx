import faker from 'faker';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-jss';

import ItemsChart from '../../../../components/Charts/Items';
import LegendDoughnutChart from '../../../../components/Charts/LegendDoughnut';
import RankingChart from '../../../../components/Charts/Ranking';
import api from '../../../../services/api';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

/**
 * This function provides a statistics list
 * @returns statistics list
 */
export default function Statistics() {
  const theme = useTheme();

  const [rankingPage, setRankingPage] = useState(1);

  const [rankingData /* setData */] = useState({
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

  const [legendDoughnutData, setLegendDoughnutData] = useState();

  /**
   * This userEffect fetch station count per network.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(`/station/count/network`, {
        params: {
          filters: {
            name: [], // Nome da estação
            network: [], // Tipo de rede (RQA, RHA ou HYBAM)
            country: [], // País
            responsible: [], // Órgão responsável
            river: [], // Rio
            variable: [], // Variáveis que a estação possui medição
          },
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setLegendDoughnutData({
              labels: data.values.map((obj) => obj.network),
              datasets: [
                {
                  label: 'Stations',
                  data: data.values.map((obj) => obj.count),
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
          }
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <ul>
      <LegendDoughnutChart
        title="Estações por rede"
        info="Este gráfico apresenta estações por rede"
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
        data={rankingData}
        totalPages={5}
        page={rankingPage}
        setRankingPage={setRankingPage}
      />
    </ul>
  );
}
