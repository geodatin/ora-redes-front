/* eslint-disable no-unused-vars */
import faker from 'faker';
import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import ItemsChart from '../../../../components/Charts/Items';
import LegendDoughnutChart from '../../../../components/Charts/LegendDoughnut';
import RankingChart from '../../../../components/Charts/Ranking';
import { countryCodes } from '../../../../constants/constraints';
import api from '../../../../services/api';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

/**
 * This function provides a statistics list
 * @returns statistics list
 */
export default function Statistics() {
  const theme = useTheme();
  const { t } = useTranslation();

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

  const [itemsData, setItemsData] = useState();
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
              labels: data.values.map(({ network }) =>
                t(`dataTypes.${network}`)
              ),
              datasets: [
                {
                  label: t('dataTypes.stations'),
                  data: data.values.map(({ count }) => count),
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
  }, [t]);

  /**
   * This userEffect fetch station count per countries.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(`/station/count/country`, {
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
            setItemsData({
              labels: data.map(({ countryId }) => t(`countries.${countryId}`)),
              datasets: [
                {
                  label: t('dataTypes.stations').toLowerCase(),
                  data: data.map(({ count }) => count),
                  icons: data.map(({ countryId }) => (
                    <ReactCountryFlag
                      svg
                      countryCode={countryCodes[countryId]}
                      style={{ fontSize: 30, marginRight: 5, borderRadius: 12 }}
                    />
                  )),
                },
              ],
            });
          }
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [t]);

  return (
    <ul>
      <LegendDoughnutChart
        title={t('statistics.charts.stationsPerNetwork.title')}
        info={t('statistics.charts.stationsPerNetwork.info')}
        data={legendDoughnutData}
      />

      <ItemsChart
        title={t('statistics.charts.stationsPerCountry.title')}
        info={t('statistics.charts.stationsPerCountry.info')}
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
