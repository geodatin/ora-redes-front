/* eslint-disable no-unused-vars */
import { createUseStyles } from 'react-jss';

import { layoutSizes } from '../../constants/constraints';

const useStyles = createUseStyles(() => ({
  wrapper: {
    width: '100%',
    height: `100%`,
  },
  mainRow: {
    position: 'relative',
    width: '100%',
    height: `calc(100% - ${layoutSizes.header.height}px)`,
  },
  notifications: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    width: layoutSizes.notifications.width,
    backgroundColor: 'gray',
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: layoutSizes.notifications.width,
    right: layoutSizes.statistics.width,
    backgroundColor: 'green',
  },
  statistics: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    width: layoutSizes.statistics.width,
    backgroundColor: 'red',
  },
}));

export default useStyles;
