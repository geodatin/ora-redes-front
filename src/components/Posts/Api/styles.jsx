import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  conteiner: {},
  title: {
    color: theme.secondary.dark,
    marginRight: 10,
  },
  titleWrapper: {
    display: 'flex',
    marginBottom: 5,
    alignItems: 'center',
  },
  description: {
    color: theme.secondary.dark,
    marginBottom: 15,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  itemTitle: {
    color: theme.neutral.gray.main,
    marginBottom: 5,
  },
  table: {
    border: `1px solid ${theme.stroke.dark}`,
    borderRadius: 5,

    '& th': {
      border: `1px solid ${theme.stroke.dark}`,
      borderTop: 'none',
      textAlign: 'left',
      paddingLeft: 10,
    },
    '& td': {
      border: `1px solid ${theme.stroke.dark}`,
      borderTop: 'none',
      borderLeft: 'none',
      paddingLeft: 10,
    },
    '& tr:first-child th': {
      borderLeft: 'none',
    },
    '& tr:first-child th:last-of-type': {
      borderRight: 'none',
    },
    '& tr:last-child td': {
      borderBottom: 'none',
    },
    '& tr td:last-of-type': {
      borderRight: 'none',
    },
  },
  th: {
    border: `1px solid ${theme.stroke.dark}`,
  },
  td: {
    border: `1px solid ${theme.stroke.dark}`,
  },
}));

export default useStyles;
