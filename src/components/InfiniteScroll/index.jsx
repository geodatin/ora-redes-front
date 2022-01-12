import { CircularProgress } from '@mui/material';
import useIntersectionObserver from '@react-hook/intersection-observer';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

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
}) {
  InfiniteScroll.propTypes = {
    page: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    isLoadingPage: PropTypes.bool.isRequired,
    isFirstLoading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const classes = useStyles();

  const [endListRef, setEndListRef] = useState();
  const { isIntersecting: isBottom } = useIntersectionObserver(endListRef);

  useEffect(() => {
    onChange(isBottom);
  }, [isBottom]);

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
    </>
  );
}
