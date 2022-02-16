import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  dialogContainer: {
    '& .MuiPaper-root': {
      backgroundColor: theme.background.main,
      width: '100%',
      maxWidth: 450,
    },
  },
  header: {
    minHeight: 47,
    display: 'flex',
    alignItems: 'center',
    padding: '0px 15px',
    justifyContent: 'space-between',
    position: 'relative',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: theme.stroke.dark,
    height: 1,
    width: '100%',
  },
  content: {
    padding: 15,
  },
  shareButton: {
    transition: 'all 0.3s ease',
    width: 34,
    heigth: 34,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  iconsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0px',
  },
  whatsappIcon: {
    '& path': {
      fill: theme.share.whatsapp,
    },
  },
  facebookIcon: {
    '& path': {
      fill: theme.share.facebook,
    },
  },
  twitterIcon: {
    '& path': {
      fill: theme.share.twitter,
    },
  },
  copyWrapper: {
    margin: '5px 0px 0px 0px',
    display: 'flex',
  },
  textfieldRoot: {
    width: '100%',

    '& .MuiFormLabel-root': {
      color: theme.neutral.gray.main,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '5px',
    },
    '& .MuiIconButton-root': {
      color: theme.secondary.dark,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.neutral.gray.main,
      transition: 'border-color .2s ease',
    },
    '& .MuiOutlinedInput-root:hover': {
      transition: 'background-color 0.15s ease',
      borderColor: theme.secondary.dark,
      backgroundColor: theme.background.main,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.secondary.dark,
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.primary.main,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.primary.main,
    },
    '& .MuiInputBase-input': {
      color: theme.secondary.dark,
    },
    '& .MuiAutocomplete-popupIndicatorOpen': {
      transform: 'rotate(0deg)',
    },
  },
  copyButton: {
    '&.MuiButton-root': {
      minWidth: 120,
      maxWidth: 120,
      backgroundColor: theme.primary.main,
      color: theme.secondary.dark,
      marginLeft: 10,

      '&:hover': {
        backgroundColor: theme.primary.main,
      },
    },
  },
}));

export default useStyles;
