import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import InfiniteScroll from '../../../components/InfiniteScroll';
import VLayout from '../../../components/Layout/Vertical';
import Typography from '../../../components/Typography';
import { networks } from '../../../constants/options';
import FilteringContext from '../../../contexts/filtering';
import api from '../../../services/api';
import { NotificationCard } from './NotificationCard';
import useStyles from './styles';

export default function Notifications() {
  const classes = useStyles();
  const { t } = useTranslation();

  const filters = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.filters
  );

  const [notifications, setNotifications] = useState([]);
  const [resultsAmount, setResultsAmount] = useState();
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  /**
   * This userEffect fetch station list.
   */
  useEffect(() => {
    let isSubscribed = true;
    setIsFirstLoading(true);
    api
      .post(
        `/station/notification`,
        {
          filters,
        },
        { params: { page: 1, pageSize } }
      )
      .then(({ data }) => {
        if (isSubscribed && data) {
          setResultsAmount(data.total);
          setMaxPage(data.pages);
          setNotifications(data.values);
          setIsFirstLoading(false);
          setPage(1);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [filters]);

  /**
   * This function fetch more notifications.
   */
  const handleOnBottom = (isBottom) => {
    let isSubscribed = true;
    const nextPage = page + 1;
    if (!isFirstLoading && isBottom && nextPage <= maxPage) {
      setIsLoadingPage(true);
      api
        .post(
          `/station/notification`,
          {
            filters,
          },
          { params: { page: nextPage, pageSize } }
        )
        .then(({ data }) => {
          if (isSubscribed) {
            setNotifications((prev) => prev.concat(data.values));
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
    <VLayout
      upRow={{
        className: classes.notificationsHeader,
        children: (
          <Typography>
            {t(`specific.notifications.title`).toUpperCase()}
          </Typography>
        ),
      }}
      mainContainer={{
        className: classes.listWrapper,
        children: (
          <ul className={classes.list}>
            <InfiniteScroll
              isLoadingPage={isLoadingPage}
              isFirstLoading={isFirstLoading}
              page={page}
              maxPage={maxPage}
              onChange={handleOnBottom}
              resultsAmount={resultsAmount ?? 0}
              noMoreResultsText={t('specific.notifications.noMoreResults')}
              noResultsText={t('specific.notifications.noResults')}
            >
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  circleColor={
                    networks[notification.network]?.color ?? 'transparent'
                  }
                  notification={notification}
                />
              ))}
            </InfiniteScroll>
          </ul>
        ),
      }}
    />
  );
}
