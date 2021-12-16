import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  notifications: {
    minWidth: 300,
    borderRight: '2px solid black',
    backgroundColor: 'green',
  },
  map: {
    backgroundColor: 'transparent',
  },
  statistics: {
    minWidth: 300,
    borderLeft: '2px solid black',
    backgroundColor: 'red',
  },
}));

export default useStyles;
