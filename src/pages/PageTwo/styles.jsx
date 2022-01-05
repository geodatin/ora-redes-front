import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  breadBarWrapper: {
    borderBottom: '1px solid',
    borderBottomColor: theme.stroke.dark,
  },
  docsWrapper: { padding: 15, maxWidth: 1000 },
  searchWrapper: {
    minWidth: 280,
    padding: 15,
    borderRight: '1px solid',
    borderRightColor: theme.stroke.dark,
  },
}));

export default useStyles;
