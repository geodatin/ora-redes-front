import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  root: {
    '&.MuiChip-root': {
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1,
    },
    '&.MuiButtonBase-root': {
      color: [theme.secondary.dark, '!important'],

      '&:hover': {
        backgroundColor: [theme.button.hover, '!important'],

        '&:active': {
          backgroundColor: `${theme.button.clicked}70 !important`,
        },
      },
    },
  },
  mini: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 400,
    fontSize: 12.8,
    height: 22,

    '&.MuiChip-root': {
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1,
    },
    '&.MuiButtonBase-root': {
      color: [theme.secondary.dark, '!important'],

      '&:hover': {
        backgroundColor: [theme.button.hover, '!important'],

        '&:active': {
          backgroundColor: `${theme.button.clicked}70 !important`,
        },
      },
    },
  },
}));

export default useStyles;
