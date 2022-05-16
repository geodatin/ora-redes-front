import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  api: {
    '& > *': {
      paddingBottom: 10,
      marginBottom: 10,
      borderBottom: `1px solid ${theme.stroke.light}`,
    },
    '& > *:last-of-type': {
      borderBottom: `none`,
    },
  },
}));

export default useStyles;
