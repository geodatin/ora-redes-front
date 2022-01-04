import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  filtersNotificationsWrapper: {
    minWidth: 280,
    borderRight: '1px solid',
    borderRightColor: theme.stroke.dark,
  },
  filtersWrapper: {
    borderBottom: '1px solid',
    borderBottomColor: theme.stroke.dark,
    height: 400,
    padding: 15,
  },
  filtersMobileWrapper: {
    position: 'absolute',
    top: 'initial',
    bottom: 0,
    height: 200,
    borderRadius: '10px 10px 0px 0px',
    padding: 15,
  },
  notificationsWrapper: { padding: 15 },
  notificationsMobileWrapper: { padding: 15 },
  breadBarWrapper: {
    borderBottom: '1px solid',
    borderBottomColor: theme.stroke.dark,
  },
  mapWrapper: {},
  statisticsWrapper: {
    overflow: 'auto',
    minWidth: 400,
    borderLeft: '1px solid',
    borderLeftColor: theme.stroke.dark,
  },
  statisticsMobileWrapper: {
    overflow: 'auto',
  },
}));

export default useStyles;
