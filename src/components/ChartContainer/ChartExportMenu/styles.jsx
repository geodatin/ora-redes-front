import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
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
