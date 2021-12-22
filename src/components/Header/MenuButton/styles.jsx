import { createUseStyles } from 'react-jss';

import { breakpoints, transitions } from '../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  button: {
    '&.MuiButtonBase-root': {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      textTransform: 'none',
      color: theme.secondary.dark,

      '&:hover': {
        backgroundColor: theme.button.hover,

        '&:active': {
          backgroundColor: 'transparent',
        },
      },
      '& .MuiTouchRipple-child, .MuiTouchRipple-childPulsate': {
        backgroundColor: theme.button.clicked,
      },
    },
  },
  caption: {
    position: 'absolute',
    right: 10,
    bottom: -3,
    fontWeight: 700,
    fontSize: 9,
    color: theme.primary.main,
    textTransform: 'uppercase',
  },
  list: {
    '& .MuiPaper-root': {
      backgroundColor: theme.background.main,
      color: theme.secondary.dark,
      transition: transitions.bgColor,
    },
    '& .MuiDrawer-paper': {
      width: '100%',
      maxWidth: '300px',

      [breakpoints.max.sm]: {
        maxWidth: '100%',
      },
    },
    '& .MuiListItemIcon-root': {
      minWidth: 36,
    },
  },
  topContainer: {
    padding: '12px 10px',
    borderBottom: `1px solid ${theme.stroke.dark}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    position: 'relative',
    display: 'flex',
  },
  logo: {
    height: 30,
    userSelect: 'none',

    '& > path': {
      fill: theme.secondary.dark,
    },
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    height: 30,
  },
  backButton: {
    '&.MuiButton-root': {
      minWidth: 30,
      minHeight: 30,
      marginRight: 0,
    },
  },
  translationTopContainer: {
    padding: '12px 16px',
    borderBottom: `1px solid red`,
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;
