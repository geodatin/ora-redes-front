import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  filtersNotificationsWrapper: {
    minWidth: 280,
    borderRight: '2px solid black',
  },
  filtersWrapper: {
    borderBottom: '2px solid black',
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
    borderBottom: '2px solid black',
  },
  mapWrapper: {},
  statisticsWrapper: {
    overflow: 'auto',
    minWidth: 400,
    borderLeft: '2px solid black',
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
