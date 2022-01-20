import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  breadBarWrapper: {
    padding: 15,
    borderBottom: '1px solid',
    borderBottomColor: theme.stroke.dark,
  },
  breadBarMobileWrapper: { padding: '10px 15px 10px 15px' },
  libraryWrapper: { padding: 15, overflow: 'auto' },
  librarysMobileWrapper: { padding: 15 },
  filteringWrapper: {
    minWidth: 280,
    padding: 15,
    borderRight: '1px solid',
    borderRightColor: theme.stroke.dark,
    overflow: 'auto',

    '& > *': {
      paddingBottom: 15,
      marginBottom: 10,
      borderBottom: `1px solid ${theme.stroke.light}`,
    },
    '& > *:last-of-type': {
      borderBottom: `none`,
      marginBottom: 0,
    },
  },
  filteringMobileWrapper: { padding: 15 },
}));

export default useStyles;
