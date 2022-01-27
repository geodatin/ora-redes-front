import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  doughnutWrapper: {
    height: '130px',
    width: '130px',
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  doughnutMiddle: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
    userSelect: 'none',
  },
});

export default useStyles;
