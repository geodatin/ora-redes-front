import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  filtersNotificationsWrapper: {
    minWidth: 280,
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
  notificationsWrapper: { padding: 15 },
  notificationsMobileWrapper: { padding: 15 },
  breadBarWrapper: {
    padding: 15,
    borderBottom: `1px solid ${theme.stroke.dark}`,
  },
  mapWrapper: {},
  statisticsWrapper: {
    overflow: 'auto',
    minWidth: 400,
    borderLeft: `1px solid ${theme.stroke.dark}`,
  },
  infoPanelMobileWrapper: {
    overflow: 'auto',
  },
  infoPanelWrapper: {
    minWidth: 480,
    borderLeft: `1px solid ${theme.stroke.dark}`,
  },
}));

export default useStyles;
