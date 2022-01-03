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
  breadcrumbWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '0px 15px',
  },
}));

export default useStyles;
