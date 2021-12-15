import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  button: {
    '&.MuiButtonBase-root': {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      textTransform: 'none',
      color: theme.secondary.dark,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
}));

export default useStyles;
