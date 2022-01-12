import { Skeleton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This funcion provides a list item container
 * @returns list item container
 */
export default function ListItemContainer({ children, isLoaded }) {
  ListItemContainer.propTypes = {
    children: PropTypes.node.isRequired,
    isLoaded: PropTypes.bool.isRequired,
  };

  ListItemContainer.defaultProps = {};

  const classes = useStyles();
  const theme = useTheme();

  return (
    <li className={classes.wrapper}>
      {isLoaded ? (
        <div> {children}</div>
      ) : (
        <Stack spacing={1}>
          <Skeleton
            sx={{ bgcolor: theme.stroke.light }}
            variant="rectangular"
            width="100%"
            height={200}
          />
        </Stack>
      )}
    </li>
  );
}
