import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  pagination: {
    '& .MuiPaginationItem-root': {
      color: theme.neutral.gray.main,
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: theme.secondary.main,
      color: theme.background.main,
    },
    '& .MuiPaginationItem-page.Mui-selected:hover': {
      backgroundColor: theme.neutral.gray.light,
    },
  },
}));

export default useStyles;
