import React, { useState } from 'react';

import InfiniteScroll from '../../../../components/InfiniteScroll';
import CardItem from './CardItem';
import useStyles from './styles';

/**
 * This function provides a card list
 * @returns card list
 */
export default function CardList() {
  const [list /* setList */] = useState([
    {
      location: {
        type: 'Point',
        coordinates: [-65.5275, -9.7847],
      },
      name: 'MORADA NOVA - JUSANTE',
      rain: 12,
      flowRate: 32,
      code: 15326000,
      level: 145,
      timestamp: '2021-12-21T13:15:00.000Z',
    },
    {
      location: {
        type: 'Point',
        coordinates: [-68.9119, -3.4569],
      },
      name: 'SÃO PAULO DE OLIVENÇA',
      rain: 22,
      flowRate: 23,
      code: 11400000,
      level: 43,
      timestamp: '2021-12-21T02:45:00.000Z',
    },
    {
      location: {
        type: 'Point',
        coordinates: [-68.9119, -3.4569],
      },
      name: 'JARAGUAIA',
      rain: 22,
      flowRate: 23,
      code: 11420000,
      level: 43,
      timestamp: '2021-12-21T02:45:00.000Z',
    },
    {
      location: {
        type: 'Point',
        coordinates: [-68.9119, -3.4569],
      },
      name: 'RIO DAS CONTAS',
      rain: 22,
      flowRate: 23,
      code: 11420300,
      level: 43,
      timestamp: '2021-12-21T02:45:00.000Z',
    },
  ]);

  const [page /* setPage */] = useState(1);
  const [maxPage /* setMaxPage */] = useState(5);
  const [isLoadingPage /* setIsLoadingPage */] = useState(true);
  const [isFirstLoading /* setIsFirstLoading */] = useState(false);

  const classes = useStyles();

  const handleOnBottom = (/* isBottom */) => {
    // fetch more items logic here
  };

  return (
    <ul className={classes.wrapper}>
      <InfiniteScroll
        isLoadingPage={isLoadingPage}
        isFirstLoading={isFirstLoading}
        page={page}
        maxPage={maxPage}
        onChange={handleOnBottom}
      >
        {list.map((item) => (
          <CardItem key={item.code} item={item} />
        ))}
      </InfiniteScroll>
    </ul>
  );
}
