import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  dialogContainer: {
    '& .MuiPaper-root': {
      backgroundColor: theme.background.main,
      width: '100%',
      maxWidth: 450,
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
  },
}));

export default useStyles;
