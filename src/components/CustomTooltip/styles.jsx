import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  arrow: {
    '&.MuiTooltip-arrow': {
      color: theme.background.popup,
    },
  },
  tooltip: {
    '&.MuiTooltip-tooltip': {
      fontSize: 12,
      fontWeight: 700,
      lineHeight: '13,66px',
      display: 'flex',
      alignItems: 'center',
      minHeight: 32,
      backgroundColor: theme.background.popup,
      color: theme.secondary.dark,
    },
  },
}));

export default useStyles;
