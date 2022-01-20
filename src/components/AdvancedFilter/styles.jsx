import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  root: {
    '& .MuiAutocomplete-endAdornment': {
      top: 8,
    },
  },
  textfield: {
    backgroundColor: theme.stroke.dark,
    borderRadius: 5,

    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child':
      {
        paddingLeft: 10,
        paddingRight: 30,
        width: '100%',
      },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
      borderRadius: 5,
    },
  },
  addIcon: {
    height: 5,
  },
  paper: {
    backgroundColor: 'green',

    '&.MuiPaper-root': {
      marginTop: 5,
      backgroundColor: theme.background.popup,
      fontSize: 16,
    },
    '& .MuiListSubheader-root': {
      paddingLeft: 10,
    },
    '& .MuiAutocomplete-groupUl .MuiAutocomplete-option': {
      paddingLeft: 10,
    },
    '& .MuiAutocomplete-groupLabel': {
      fontSize: 12.8,
      backgroundColor: theme.background.popup,
    },
  },
}));

export default useStyles;
