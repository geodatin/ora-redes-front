import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  loading: {
    paddingBottom: 20,
    paddingTop: 20,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResults: {
    width: '100%',
    padding: '20px 0px 20px 0px',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default useStyles;
