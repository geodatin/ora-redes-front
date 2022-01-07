import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  checkbox: {
    '&.MuiCheckbox-root': {
      boxSizing: 'border-box',
      padding: 0,

      '& input': {
        width: 23,
        height: 24,
      },
      '& .MuiTouchRipple-root': {
        width: 23,
        height: 24,
        transform: 'translate(0px, -1px)',
      },
    },
  },
}));

export default useStyles;
