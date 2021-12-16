/* eslint-disable no-unused-vars */
import { createUseStyles } from 'react-jss';

import { layout } from '../../constants/constraints';

const useStyles = createUseStyles(() => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    height: `calc(100% - ${layout.header.sizes.height}px)`,
  },
  leftColumn: {
    width: layout.leftColumn.sizes.width,
    backgroundColor: 'gray',
  },
  mainContainer: {
    width: layout.mainContainer.sizes.width,
    backgroundColor: 'green',
  },
  rightColumn: {
    width: layout.rightColumn.sizes.width,
    backgroundColor: 'red',
  },
}));

export default useStyles;
