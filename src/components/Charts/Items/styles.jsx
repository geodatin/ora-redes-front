import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  childrenWrapper: {
    marginTop: 20,
    display: 'flex',
    flexFlow: 'row wrap',
    '& > *': {
      marginBottom: 10,
    },

    '& > :nth-last-child(-n+2)': {
      marginBottom: 0,
    },
  },
  item: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '50%',
  },
}));

export default useStyles;
