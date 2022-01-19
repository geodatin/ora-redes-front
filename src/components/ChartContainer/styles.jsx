import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    padding: 15,
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  chartWrapper: {
    width: '100%',
    height: '300px',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
}));

export default useStyles;
