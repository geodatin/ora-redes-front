import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    '& .MuiToggleButton-root': {
      height: 35,
      color: theme.secondary.dark,
      backgroundColor: theme.stroke.light,
      border: 'none',
      borderRadius: '5px 5px 5px 5px',
      '&:hover': {
        backgroundColor: theme.neutral.gray.light,
      },
    },
    '& .MuiToggleButton-root.Mui-selected': {
      color: theme.neutral.white,
      backgroundColor: theme.neutral.gray.medium,

      '&:hover': {
        backgroundColor: theme.neutral.gray.medium,
      },
    },
  },
}));

export default useStyles;
