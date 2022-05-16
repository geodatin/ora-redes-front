import { createUseStyles } from 'react-jss';

const doughnutSquareSide = '130px';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  doughnutWrapper: {
    height: doughnutSquareSide,
    width: doughnutSquareSide,
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
  doughnutDescription: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: doughnutSquareSide,
    marginTop: 10,
  },
});

export default useStyles;
