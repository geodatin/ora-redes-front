import { createUseStyles } from 'react-jss';

import { transitions } from '../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  container: {
    position: 'absolute',
    backgroundColor: theme.background.main,
    color: theme.secondary.dark,
    width: 35,
    top: 10,
    left: 10,
    zIndex: 997,
    borderRadius: 5,
    border: `1px solid ${theme.stroke.dark}`,
    cursor: 'pointer',
  },
  button: {
    '&.MuiButtonBase-root': {
      color: theme.secondary.dark,
      transition: transitions.bgColor,
      borderRadius: 5,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 35,
      minWidth: 0,
      minHeight: 0,
      overflow: 'hidden',

      '&:hover': {
        backgroundColor: theme.button.hover,

        '&:active': {
          '&::before': {
            backgroundColor: theme.button.clicked,
          },
        },
      },
      '&::before': {
        position: 'absolute',
        content: "''",
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        transition: 'background-color .2s ease',
        opacity: 0.4,
        zIndex: 0,
      },
      '&:first-of-type': {
        borderRadius: '5px 5px 0px 0px',
      },
      '&:last-of-type': {
        borderRadius: '0px 0px 5px 5px',
      },
    },
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    transform: 'scale(0.8)',
  },
}));

export default useStyles;
