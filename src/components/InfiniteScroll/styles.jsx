import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  loading: {
    paddingBottom: 40,
    paddingTop: 10,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default useStyles;
