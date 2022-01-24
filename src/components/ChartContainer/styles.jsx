import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    padding: 15,
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  chartWrapper: {
    width: '100%',
    height: '300px',
    display: 'flex',
    flexFlow: 'column nowrap',
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
