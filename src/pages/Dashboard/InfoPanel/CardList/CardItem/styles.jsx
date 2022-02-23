import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  cardHeader: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  locationButton: {
    cursor: 'pointer',
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
  },
  doughnuts: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 10,
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollSnapType: 'x mandatory',

    '&::-webkit-scrollbar': {
      height: 10,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.scrollBar.track,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.scrollBar.thumb,
      borderRadius: 10,
    },
  },
}));

export default useStyles;
