/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import InfiniteScroll from '../../../../components/InfiniteScroll';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';
import { CardItem } from './CardItem';
import useStyles from './styles';

/**
 * This function provides a card list
 * @returns card list
 */
export default function CardList({ tabpanelref }) {
  CardList.propTypes = {
    tabpanelref: PropTypes.shape(),
  };

  CardList.defaultProps = {
    tabpanelref: undefined,
  };

  const filters = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.filters
  );

  const [isFirstLoading, setIsFirstLoading] = useState(false);

  const [list, setList] = useState([]);
  const [resultsAmount, setResultsAmount] = useState();

  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  function scrollToTop() {
    if (tabpanelref) {
      tabpanelref?.current.scrollTo(0, 0);
    }
  }
  const { t } = useTranslation();
  const classes = useStyles();

  /**
   * This userEffect fetch station list.
   */
  useEffect(() => {
    let isSubscribed = true;
    setIsFirstLoading(true);
    api
      .post(
        `/observation/list/last`,
        {
          filters,
        },
        { params: { page: 1, pageSize } }
      )
      .then(({ data }) => {
        if (isSubscribed) {
          if (data) {
            setResultsAmount(data.total);
            setMaxPage(data.pages);
            scrollToTop();
            setList(data.values);
            setIsFirstLoading(false);
            setPage(1);
          }
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [filters]);

  /**
   * This function fetch more stations.
   */
  const handleOnBottom = (isBottom) => {
    let isSubscribed = true;
    const nextPage = page + 1;
    if (!isFirstLoading && isBottom && nextPage <= maxPage) {
      setIsLoadingPage(true);
      api
        .post(
          `/observation/list/last`,
          {
            filters,
          },
          { params: { page: nextPage, pageSize } }
        )
        .then(({ data }) => {
          if (isSubscribed) {
            setList((prev) => prev.concat(data.values));
            setIsLoadingPage(false);
            setPage(nextPage);
          }
        });
    }
    return () => {
      isSubscribed = false;
    };
  };

  return (
    <ul className={classes.wrapper}>
      <InfiniteScroll
        isLoadingPage={isLoadingPage}
        isFirstLoading={isFirstLoading}
        page={page}
        maxPage={maxPage}
        onChange={handleOnBottom}
        resultsAmount={resultsAmount ?? 0}
        noMoreResultsText={t('specific.list.noMoreResults')}
        noResultsText={t('specific.list.noResults')}
      >
        {list.map((item) => (
          <CardItem key={item.id} item={item} />
        ))}
      </InfiniteScroll>
    </ul>
  );
}
