import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  dialogContainer: {
    '& .MuiPaper-root': {
      backgroundColor: theme.background.main,
      width: '100%',
      maxWidth: 450,
      maxHeight: 600,
    },
  },
  header: {
    minHeight: 47,
    display: 'flex',
    alignItems: 'center',
    padding: '0px 15px',
    justifyContent: 'space-between',
    position: 'relative',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: theme.stroke.dark,
    height: 1,
    width: '100%',
  },
  content: {
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
  button: {
    '&.MuiButton-root': {
      width: '100%',
      backgroundColor: theme.primary.main,
      color: theme.neutral.white,
      textTransform: 'none',

      '&:hover': {
        backgroundColor: theme.primary.light,
      },
    },
  },
}));

export default useStyles;
