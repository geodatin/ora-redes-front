import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  breadBarWrapper: {
    padding: 15,
    borderBottom: `1px solid ${theme.stroke.dark}`,
  },
  breadBarMobileWrapper: { padding: '10px 15px 10px 15px' },
  methodsWrapper: {
    padding: 15,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.scrollBar.track,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.scrollBar.thumb,
      borderRadius: 10,
    },
  },
  methodsMobileWrapper: { padding: 15 },
  methodsListWrapper: {
    minWidth: 280,
    borderRight: `1px solid ${theme.stroke.dark}`,
    overflow: 'auto',

    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.scrollBar.track,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.scrollBar.thumb,
      borderRadius: 10,
    },
  },
  methodsListMobileWrapper: {},
}));

export default useStyles;
