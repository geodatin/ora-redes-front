import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  mapContainer: {
    position: 'relative',
  },
  itemContainer: {
    '& > div': {
      marginBottom: 10,
    },
  },
  northIcon: {
    position: 'absolute',
    height: 30,
    right: 10,
    top: 10,
    zIndex: 997,
  },
}));

export default useStyles;
