import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  chips: {},
  chip: {
    marginRight: 5,
    marginBottom: 5,
  },
  autocompleteGroup: {
    '&.MuiListSubheader-root': {
      fontSize: 12.8,
      backgroundColor: theme.popup.background,
      height: 40,
      paddingLeft: 15,
      transform: 'translateY(0px)',
    },
  },
  autocompletePaper: {
    '&::after': {
      content: "''",
      width: '100%',
      height: 13,
      backgroundColor: theme.popup.background,
      position: 'fixed',
      left: 0,
      top: 0,
    },
  },
}));

export default useStyles;
