import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    marginBottom: 15,
    width: '100%',
  },
  titleHeader: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchField: {
    width: '100%',
    marginTop: 15,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.stroke.dark,
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
