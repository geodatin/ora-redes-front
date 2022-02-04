import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  listWrapper: {
    overflow: 'auto',
    position: 'relative',
  },
  list: {
    padding: '0px 5px 0px 15px',
    position: 'absolute',
    width: '100%',
    '& > *': {
      borderBottom: `1px solid ${theme.stroke.light}`,
      marginBottom: 10,
    },
    '& > *:nth-last-child(3)': {
      borderBottom: `none`,
    },
    '& > *:last-of-type': {
      borderBottom: `none`,
      marginBottom: 0,
    },
  },
  notificationsHeader: {
    padding: 15,
  },
}));

export default useStyles;
