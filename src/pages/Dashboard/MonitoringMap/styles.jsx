import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  popup: {
    '& .leaflet-popup-content-wrapper': {
      backgroundColor: theme.background.main,
      borderRadius: 5,
      boxShadow: '2px 3px 6px 3px rgba(0,0,0,0.17)',
    },
    '& .leaflet-popup-tip': {
      backgroundColor: theme.background.main,
    },
    '& .leaflet-popup-content': {
      color: theme.secondary.dark,
    },
  },
  separator: {
    backgroundColor: theme.stroke.dark,
    margin: '5px 0px',
    width: '100%',
    height: 1,
  },
  popupItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 5,

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  popupItemTitle: {
    color: theme.neutral.gray.main,
  },
}));

export default useStyles;
