import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  button: {
    '&.MuiButtonBase-root': {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: 50,
      display: 'flex',
      textTransform: 'none',
      color: theme.secondary.dark,
      padding: '0px 20px',
      borderRadius: 0,
      width: '100%',

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
  activedButton: {
    '&.MuiButtonBase-root': {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: 50,
      display: 'flex',
      textTransform: 'none',
      color: theme.secondary.dark,
      padding: '0px 20px',
      borderRadius: 0,
      backgroundColor: theme.button.actived,
      width: '100%',

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
