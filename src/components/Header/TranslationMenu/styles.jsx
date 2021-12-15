import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {},
  button: {
    '&.MuiButtonBase-root': {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      textTransform: 'none',
      color: theme.secondary.light,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
}));

export default useStyles;
