import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    '& > *': {
      borderBottom: `1px solid ${theme.stroke.light}`,
    },
    '& > *:nth-last-child(3)': {
      borderBottom: `none`,
    },
  },
}));

export default useStyles;
