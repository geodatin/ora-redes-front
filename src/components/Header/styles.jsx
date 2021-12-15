import { createUseStyles } from 'react-jss';

import { layoutSizes } from '../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    height: layoutSizes.header.height,
    width: '100%',
    backgroundColor: theme.stroke.light,
  },
  logoContainer: {
    backgroundColor: theme.primary.main,
  },
  logoDetail: {
    backgroundColor: theme.primary.main,
    width: 5,
    height: '100%',
  },
}));

export default useStyles;
