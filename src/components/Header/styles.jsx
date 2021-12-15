import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    height: 50,
    width: '100%',
    backgroundColor: theme.stroke.light,
  },
  logoContainer: {
    backgroundColor: theme.primary.main,
  },
  logoDetail: {
    backgroundColor: theme.primary.main,
    width: 5,
    height: '100%',
  },
}));

export default useStyles;
