import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  button: {
    '&.MuiButtonBase-root': {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      textTransform: 'none',
      color: theme.neutral.gray.main,
      height: '100%',
      borderRadius: 0,
      padding: '0px 15px',

      '&:hover': {
        backgroundColor: theme.button.hover,

        '&:active': {
          backgroundColor: 'transparent',
        },
      },
      '&:active': {
        color: theme.secondary.dark,
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
      justifyContent: 'center',
      display: 'flex',
      textTransform: 'none',
      color: theme.secondary.dark,
      height: '100%',
      borderRadius: 0,
      padding: '0px 15px',
      backgroundColor: theme.button.actived,

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
