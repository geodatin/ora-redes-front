import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  breadBarWrapper: {
    padding: 15,
    borderBottom: `1px solid ${theme.stroke.dark}`,
  },
  breadBarMobileWrapper: { padding: '10px 15px 10px 15px' },
  methodsWrapper: { padding: 15, overflow: 'auto' },
  methodsMobileWrapper: { padding: 15 },
  methodsListWrapper: {
    minWidth: 280,
    borderRight: `1px solid ${theme.stroke.dark}`,
  },
  methodsListMobileWrapper: {},
}));

export default useStyles;
