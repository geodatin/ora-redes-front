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
      color: theme.secondary.dark,

      '&:hover': {
        backgroundColor: theme.button.hover,

        '&:active': {
          backgroundColor: `${theme.button.clicked}70`,
        },
      },
    },
  },
  label: {
    '&.MuiChip-label': {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeight: 400,
      fontSize: 12.8,
    },
  },
  boldLabel: {
    '&.MuiChip-label': {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: 12.8,
      fontWeight: 700,
    },
  },
}));

export default useStyles;
