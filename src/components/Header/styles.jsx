import { createUseStyles } from 'react-jss';

import { layout, transitions } from '../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    height: layout.header.sizes.height,
    width: '100%',
    backgroundColor: theme.stroke.light,
    transition: transitions.bgColor,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15,
    userSelect: 'none',
    textDecoration: 'none',
    color: 'inherit',
  },
  logoDetail: {
    backgroundColor: theme.primary.main,
    width: 5,
    height: '100%',
    marginRight: 15,
  },
  menuItems: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  initialItems: {
    display: 'flex',
  },
  endItems: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
  },
  separator: {
    backgroundColor: theme.stroke.dark,
    width: 1,
    height: 30,
    margin: '0px 10px',
    transition: transitions.bgColor,
  },
}));

export default useStyles;
