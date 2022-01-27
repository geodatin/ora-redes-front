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
});

export default useStyles;
