import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  childrenWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
  },
  circle: {
    minWidth: 15,
    minHeight: 15,
    marginRight: 10,
    borderRadius: '100%',
    background: 'green',
  },
  doughnutWrapper: {
    height: '130px',
    width: '130px',
    position: 'relative',
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
  legendWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    justifyContent: 'space-around',
    paddingLeft: 15,
  },
  legendItem: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  legendNameValue: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
