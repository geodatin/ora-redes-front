import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    whiteSpace: 'nowrap',
    height: '100%',
    width: '100%',
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
  itemWithSeparator: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    whiteSpace: 'nowrap',
  },
}));

export default useStyles;
