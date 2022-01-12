import React, { useState } from 'react';
import { useTheme } from 'react-jss';

import InfiniteScroll from '../../../../components/InfiniteScroll';
import ListItemContainer from '../../../../components/ListItemContainer';

/**
 * This function provides a card list
 * @returns card list
 */
export default function CardList() {
  const [list /* setList */] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ]);

  const [page /* setPage */] = useState(1);
  const [maxPage /* setMaxPage */] = useState(5);
  const [isLoadingPage /* setIsLoadingPage */] = useState(true);
  const [isFirstLoading /* setIsFirstLoading */] = useState(false);

  const theme = useTheme();

  const handleChangeBottom = (/* isBottom */) => {
    // fetch logic here
  };

  return (
    <ul>
      <InfiniteScroll
        isLoadingPage={isLoadingPage}
        isFirstLoading={isFirstLoading}
        page={page}
        maxPage={maxPage}
        onChange={handleChangeBottom}
      >
        {list.map((item) => (
          <ListItemContainer key={item} isLoaded={!!item}>
            <div
              style={{
                height: 300,
                borderRadius: 5,
                backgroundColor: theme.neutral.gray.light,
              }}
            />
          </ListItemContainer>
        ))}
      </InfiniteScroll>
    </ul>
  );
}
