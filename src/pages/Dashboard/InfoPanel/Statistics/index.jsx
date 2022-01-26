import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import ItemsChart from '../../../../components/Charts/Items';
import LegendDoughnutChart from '../../../../components/Charts/LegendDoughnut';
import RankingChart from '../../../../components/Charts/Ranking';
import { countryCodes } from '../../../../constants/definitions';
import api from '../../../../services/api';

/**
 * This function provides a statistics list
 * @returns statistics list
 */
export default function Statistics() {
  const theme = useTheme();
  const { t } = useTranslation();

  const [rankingParams, setRankingParams] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });
  const [rankingData, setRankingData] = useState();

  const [itemsData, setItemsData] = useState();
  const [legendDoughnutData, setLegendDoughnutData] = useState();

  /**
   * This userEffect fetch station count per network.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(`/station/count/network`, {
        filters: {
          name: [], // Nome da estação
          network: [], // Tipo de rede (RQA, RHA ou HYBAM)
          country: [], // País
          responsible: [], // Órgão responsável
          river: [], // Rio
          variable: [], // Variáveis que a estação possui medição
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setLegendDoughnutData({
              labels: data.values.map(({ network }) =>
                t(`specific.dataType.networks.${network}`)
              ),
              datasets: [
                {
                  label: t('specific.dataType.station.plural'),
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
        filters: {
          name: [], // Nome da estação
          network: [], // Tipo de rede (RQA, RHA ou HYBAM)
          country: [], // País
          responsible: [], // Órgão responsável
          river: [], // Rio
          variable: [], // Variáveis que a estação possui medição
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setItemsData({
              labels: data.map(({ countryId }) =>
                t(`specific.countries.${countryId}`)
              ),
              datasets: [
                {
                  label: t('specific.dataType.station.plural').toLowerCase(),
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

  /**
   * This userEffect fetch ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/station/ranking/river`,
        {
          filters: {
            name: [], // Nome da estação
            network: [], // Tipo de rede (RQA, RHA ou HYBAM)
            country: [], // País
            responsible: [], // Órgão responsável
            river: [], // Rio
            variable: [], // Variáveis que a estação possui medição
          },
        },
        {
          params: {
            page: rankingParams.page,
            order: rankingParams.order ? 'desc' : 'asc',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setRankingData({
              chartData: {
                labels: data.x.map(
                  (label, index) => `${data.position[index]}°  ${label}`
                ),
                datasets: [
                  {
                    label: t(`specific.dataType.station.plural`),
                    data: data?.series[0]?.data,
                    backgroundColor: [theme.primary.main],
                    borderColor: [theme.primary.main],
                    borderRadius: 5,
                    barThickness: 15,
                  },
                ],
              },
            });
            setRankingParams((prevParams) => ({
              ...prevParams,
              totalPages: data.pages,
            }));
          }
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [rankingParams, t]);

  return (
    <ul>
      <LegendDoughnutChart
        title={t('specific.statistics.charts.stationsPerNetwork.title')}
        info={t('specific.statistics.charts.stationsPerNetwork.info')}
        data={legendDoughnutData}
      />

      <ItemsChart
        title={t('specific.statistics.charts.stationsPerCountry.title')}
        info={t('specific.statistics.charts.stationsPerCountry.info')}
        data={itemsData}
      />

      <RankingChart
        title={t('specific.statistics.charts.riverRanking.title')}
        info={t('specific.statistics.charts.riverRanking.info')}
        data={rankingData?.chartData}
        params={rankingParams}
        setParams={setRankingParams}
      />
    </ul>
  );
}
