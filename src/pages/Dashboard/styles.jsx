import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  filtersNotificationsWrapper: {
    borderRight: `1px solid ${theme.stroke.dark}`,
  },
  filtersWrapper: {
    borderBottom: `1px solid ${theme.stroke.dark}`,
    height: 'auto',
    padding: 15,
  },
  filtersMobileWrapper: {
    position: 'absolute',
    top: 'initial',
    bottom: 0,
    borderRadius: '10px 10px 0px 0px',
    padding: 15,
  },
  notificationsWrapper: {
    position: 'relative',
    height: '100%',
  },
  notificationsMobileWrapper: {},
  breadBarWrapper: {
    padding: 15,
    borderBottom: `1px solid ${theme.stroke.dark}`,
  },
  mapWrapper: {},
  infoPanelMobileWrapper: {
    overflow: 'auto',
  },
  infoPanelWrapper: {
    borderLeft: `1px solid ${theme.stroke.dark}`,
  },
}));

export default useStyles;
