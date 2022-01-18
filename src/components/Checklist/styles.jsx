import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    marginBottom: 15,
  },
  titleHeader: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
}));

export default useStyles;
