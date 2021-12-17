import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  leftWrapper: {
    minWidth: 300,
    borderRight: '2px solid black',
  },
  filters: {
    borderBottom: '2px solid black',
    backgroundColor: 'blue',
    height: 400,
  },
  notifications: {
    backgroundColor: 'green',
  },
  mainWrapper: {
    borderBottom: '2px solid black',
    backgroundColor: 'black',
  },
  mapWrapper: {
    backgroundColor: 'transparent',
  },
  statistics: {
    minWidth: 300,
    borderLeft: '2px solid black',
    backgroundColor: 'red',
  },
}));

export default useStyles;
