import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    paddingBottom: 10,
  },
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
    marginRight: 15,
    borderRadius: '100%',
  },
  notificationTextContent: {
    height: '100%',
    lineHeight: 1.2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  locationButton: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: 5,
  },
});

export default useStyles;
