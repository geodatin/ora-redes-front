import { createUseStyles } from 'react-jss';

import { layout } from '../../../constants/constraints';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    height: `calc(100% - ${layout.header.sizes.height}px)`,
  },
  leftColumn: {
    width: layout.leftColumn.sizes.width,
  },
  mainContainer: {
    width: '100%',
  },
  rightColumn: {
    width: layout.rightColumn.sizes.width,
  },
});

export default useStyles;
