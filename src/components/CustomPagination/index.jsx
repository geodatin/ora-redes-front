import { Pagination } from '@mui/material';
import React from 'react';

import useStyles from './styles';

export default function CustomPagination(props) {
  const classes = useStyles();

  return <Pagination className={classes.pagination} {...props} />;
}
