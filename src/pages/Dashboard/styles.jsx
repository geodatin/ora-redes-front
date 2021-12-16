/* eslint-disable no-unused-vars */
import { createUseStyles } from 'react-jss';

import { layout } from '../../constants/constraints';

const useStyles = createUseStyles(() => ({
  wrapper: {
    width: '100%',
    height: `100%`,
  },
  mainRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    height: `calc(100% - ${layout.header.sizes.height}px)`,
  },
  leftColumn: {
    width: layout.leftColumn.sizes.width,
    backgroundColor: 'gray',
  },
  mapContainer: {
    width: layout.mapContainer.sizes.width,
    backgroundColor: 'green',
  },
  rightColumn: {
    width: layout.rightColumn.sizes.width,
    backgroundColor: 'red',
  },
}));

export default useStyles;
