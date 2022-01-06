import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  library: {
    '& > *': {
      paddingBottom: 15,
      marginBottom: 10,
      borderBottom: `1px solid ${theme.stroke.light}`,
    },
    '& > *:last-of-type': {
      borderBottom: `none`,
    },
  },
}));

export default useStyles;
