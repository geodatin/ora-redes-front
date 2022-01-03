import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  separator: {
    fontSize: 10,
    color: theme.neutral.gray.main,
    margin: '0px 8px',
  },
  principalItem: {
    textTransform: 'uppercase',
    color: theme.secondary.dark,
  },
  secondaryItem: {
    color: theme.neutral.gray.main,
  },
}));

export default useStyles;
