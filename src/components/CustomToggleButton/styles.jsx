import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    '& .MuiToggleButton-root': {
      height: 35,
      color: theme.secondary.dark,
      backgroundColor: theme.toggleButton.unabled,
      border: 'none',
      borderRadius: '5px 5px 5px 5px',
      '&:hover': {
        backgroundColor: theme.toggleButton.hover,
      },
    },
    '& .MuiToggleButton-root.Mui-selected': {
      color: theme.neutral.white,
      backgroundColor: theme.toggleButton.actived,

      '&:hover': {
        backgroundColor: theme.toggleButton.actived,
      },
    },
  },
}));

export default useStyles;
