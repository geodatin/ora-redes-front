import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  chartWrapper: {
    width: '100%',
    height: '300px',
  },
}));

export default useStyles;
