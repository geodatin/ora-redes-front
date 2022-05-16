import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    overflow: 'auto',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,

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
}));

export default useStyles;
