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
}));

export default useStyles;
