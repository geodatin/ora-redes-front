import { Pagination } from '@mui/material';
import React from 'react';

import useStyles from './styles';

/**
 * This component renders a custom Pagination for the application
 * @returns Custom Pagination
 */
export default function CustomPagination(props) {
  const classes = useStyles();

  return <Pagination className={classes.pagination} {...props} />;
}
