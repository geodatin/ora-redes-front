import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  breadBarWrapper: {
    padding: 15,
    borderBottom: '1px solid',
    borderBottomColor: theme.stroke.dark,
  },
  breadBarMobileWrapper: { padding: '10px 15px 10px 15px' },
  docsWrapper: { padding: 15 },
  docsMobileWrapper: { padding: 15 },
  methodsWrapper: {
    minWidth: 280,
    padding: 15,
    borderRight: '1px solid',
    borderRightColor: theme.stroke.dark,
  },
  methodsMobileWrapper: { padding: 15 },
}));

export default useStyles;
