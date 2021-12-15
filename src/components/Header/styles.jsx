import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    height: 60,
    width: '100%',
    backgroundColor: theme.secondary.dark,
  },
}));

export default useStyles;
