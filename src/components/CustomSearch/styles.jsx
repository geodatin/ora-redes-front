import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  searchField: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.textfield.background,
    borderRadius: 5,
    padding: '0px 0px 0px 15px',

    '&:hover': {
      outline: `1px solid ${theme.secondary.dark}`,
    },
    '&:focus-within': {
      outline: `2px solid ${theme.primary.main}`,
    },
  },
}));

export default useStyles;
