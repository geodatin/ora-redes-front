import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  cardHeader: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  locationButton: {
    cursor: 'pointer',
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
  },
  doughnuts: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default useStyles;
