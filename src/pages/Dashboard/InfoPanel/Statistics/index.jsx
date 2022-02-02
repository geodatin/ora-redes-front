import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import ItemsChart from '../../../../components/Charts/Items';
import LegendDoughnutChart from '../../../../components/Charts/LegendDoughnut';
import RankingChart from '../../../../components/Charts/Ranking';
import Treemap from '../../../../components/Charts/Treemap';
import { countryCodes, networks } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';
import getTextWidth from '../../../../utils';

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
  const [treemapData, setTreemapData] = useState();

  const {
    values: { autocompleteSelection },
  } = useContext(FilteringContext);

  /**
   * This userEffect fetch station count per network.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(`/station/count/network`, {
        filters: autocompleteSelection,
      })
      .then(({ data }) => {
        if (isSubscribed && data) {
          setLegendDoughnutData({
            labels: data.values.map(({ network }) =>
              t(networks[network].translation)
            ),
            datasets: [
              {
                label: t('specific.dataType.station.plural'),
                data: data.values.map(({ count }) => count),
                backgroundColor: data.values.map(
                  ({ network }) => networks[network].color
                ),
                borderColor: 'transparent',
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [t, autocompleteSelection]);

  /**
   * This userEffect fetch station count per countries.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(`/station/count/country`, {
        filters: autocompleteSelection,
      })
      .then(({ data }) => {
        if (isSubscribed && data) {
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
      });

    return () => {
      isSubscribed = false;
    };
  }, [t, autocompleteSelection]);

  /**
   * This userEffect fetch ranking data.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(
        `/station/ranking/river`,
        {
          filters: autocompleteSelection,
        },
        {
          params: {
            page: rankingParams.page,
            order: rankingParams.order ? 'desc' : 'asc',
          },
        }
      )
      .then(({ data }) => {
        if (isSubscribed && data) {
          setRankingData({
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
          });
          setRankingParams((prevParams) => ({
            ...prevParams,
            totalPages: data.pages,
          }));
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [rankingParams.page, rankingParams.order, autocompleteSelection, t]);

  /**
   * This userEffect fetch variable count per network.
   */
  useEffect(() => {
    let isSubscribed = true;
    api
      .post(`/station/count/variable`, {
        filters: autocompleteSelection,
      })
      .then(({ data }) => {
        if (isSubscribed && data) {
          setTreemapData({
            datasets: [
              {
                tree: data,
                key: 'stations',
                groups: ['network', 'variable'],
                borderColor: theme.background.main,
                borderWidth: 2,
                spacing: 0,
                labels: {
                  display: true,
                  color: theme.background.main,
                  font: {
                    size: 16,
                  },
                  hoverFont: {
                    weight: 'bold',
                  },
                  formatter: (ctx) => {
                    const translation = t(
                      `specific.dataType.variable.items.${ctx?.raw.g}`
                    );
                    let label = '';
                    Array.from(translation).forEach((c) => {
                      if (getTextWidth(`${label}...`, 16) < ctx.raw.w - 40) {
                        label += c;
                      }
                    });
                    return label === translation
                      ? `${translation} (${ctx.raw.v})`
                      : `${label}...`;
                  },
                },
                captions: {
                  display: false,
                },
                backgroundColor: (ctx) => {
                  const network = ctx.raw?.g;
                  return networks[network]?.color ?? 'transparent';
                },
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [t, theme, autocompleteSelection]);

  return useMemo(
    () => (
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
          data={rankingData}
          params={rankingParams}
          setParams={setRankingParams}
        />

        <Treemap
          title={t(
            'specific.statistics.charts.stationsPerVariableTreemap.title'
          )}
          info={t('specific.statistics.charts.stationsPerVariableTreemap.info')}
          data={treemapData}
          options={{
            plugins: {
              tooltip: {
                displayColors: false,
                filter(ctx) {
                  return !Object.keys(networks).some(
                    (network) => network === ctx.raw.g
                  );
                },
                callbacks: {
                  label(ctx) {
                    return `${t(
                      `specific.dataType.variable.items.${ctx.raw.g}`
                    )}: ${ctx.raw.v} ${t(
                      `specific.dataType.station.plural`
                    ).toLowerCase()}`;
                  },
                  title() {},
                },
              },
            },
          }}
        />
      </ul>
    ),
    [legendDoughnutData, itemsData, rankingData, treemapData]
  );
}
