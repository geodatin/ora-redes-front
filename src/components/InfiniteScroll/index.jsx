import { CircularProgress } from '@mui/material';
import useIntersectionObserver from '@react-hook/intersection-observer';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-jss';

import Typography from '../Typography';
import useStyles from './styles';

/**
 * This funcion provides a infinite scroll
 * @returns infinite scroll
 */
export default function InfiniteScroll({
  children,
  page,
  maxPage,
  isLoadingPage,
  isFirstLoading,
  onChange,
  resultsAmount,
  noMoreResultsText,
  noResultsText,
}) {
  InfiniteScroll.propTypes = {
    page: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    isLoadingPage: PropTypes.bool.isRequired,
    isFirstLoading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    resultsAmount: PropTypes.number.isRequired,
    noMoreResultsText: PropTypes.string.isRequired,
    noResultsText: PropTypes.string.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();

  const [endListRef, setEndListRef] = useState();
  const { isIntersecting: isBottom } = useIntersectionObserver(endListRef);

  useEffect(() => {
    onChange(isBottom);
  }, [isBottom]);

  if (resultsAmount === 0) {
    return (
      <li className={classes.noResults}>
        <Typography style={{ color: theme.neutral.gray.main }} variant="body">
          {noResultsText}
        </Typography>
      </li>
    );
  }

  return (
    <>
      {children}
      <li ref={setEndListRef} />
      {page !== maxPage && (
        <li className={classes.loading}>
          <CircularProgress
            style={
              isLoadingPage || isFirstLoading
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }
            size={30}
          />
        </li>
      )}
      <li
        style={{
          width: '100%',
          padding: '20px 0px 20px 0px',
          display: page === maxPage && !isFirstLoading ? 'flex' : 'none',
          justifyContent: 'center',
        }}
      >
        <Typography style={{ color: theme.neutral.gray.main }} variant="body">
          {noMoreResultsText}
        </Typography>
      </li>
    </>
  );
}
