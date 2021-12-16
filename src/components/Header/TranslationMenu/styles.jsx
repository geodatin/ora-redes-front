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
      color: theme.secondary.dark,

      '&:hover': {
        backgroundColor: theme.button.hover,

        '&:active': {
          backgroundColor: 'transparent',
        },
      },
      '& .MuiTouchRipple-child, .MuiTouchRipple-childPulsate': {
        backgroundColor: theme.button.clicked,
      },
    },
  },
}));

export default useStyles;
