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
  menu: {
    backgroundColor: theme.popup.background,
    '& .MuiMenuItem-root:hover': {
      backgroundColor: theme.popup.hover,
    },
    '& .MuiMenuItem-root.MuiMenuItem-gutters.Mui-selected': {
      backgroundColor: theme.popup.actived,
    },
  },
}));

export default useStyles;
