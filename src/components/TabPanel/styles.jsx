import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  wrapper: {
    overflow: 'auto',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
}));

export default useStyles;
