import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: { marginBottom: 20 },
  title: {
    color: theme.secondary.dark,
    marginRight: 10,
  },
  titleWrapper: {
    display: 'flex',
    marginBottom: 5,
    alignItems: 'center',
  },
  description: {
    color: theme.secondary.dark,
  },
  itemsWrapper: {
    display: 'flex',
    marginTop: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 25,
  },
  itemKey: {
    color: theme.neutral.gray.main,
  },
  itemValue: {
    color: theme.secondary.dark,
  },
  bottom: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
