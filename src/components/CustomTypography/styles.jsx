import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  h1: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 700,
    fontSize: 39.06,
  },
  h2: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 700,
    fontSize: 31.25,
  },
  h3: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 700,
    fontSize: 25,
  },
  paragraph: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 400,
    fontSize: 20,
  },
  body: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 400,
    fontSize: 16,
  },
  caption: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 400,
    fontSize: 12.8,
  },
  bold: {
    fontWeight: 700,
  },
  italic: {
    fontStyle: 'italic',
  },
}));

export default useStyles;
