import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
}));

export default useStyles;
