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
  },
  filtersMobileWrapper: {
    position: 'absolute',
    top: 'initial',
    bottom: 0,
    height: 200,
    borderRadius: '10px 10px 0px 0px',
  },
  notificationsWrapper: {},
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
  breadcrumbWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '0px 15px',
  },
}));

export default useStyles;
