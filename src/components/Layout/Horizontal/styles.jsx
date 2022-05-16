import { createUseStyles } from 'react-jss';

import { layout } from '../../../constants/constraints';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    height: `calc(100% - ${layout.header.sizes.height}px)`,
    overflowX: 'hidden',
  },
  leftColumn: {
    minWidth: layout.leftColumn.sizes.width,
    width: layout.leftColumn.sizes.width,
    transition: 'all 0.5s ease',
  },
  mainContainer: {
    width: '100%',
  },
  rightColumn: {
    minWidth: layout.rightColumn.sizes.width,
    width: layout.rightColumn.sizes.width,
    transition: 'all 0.5s ease',
  },
});

export default useStyles;
