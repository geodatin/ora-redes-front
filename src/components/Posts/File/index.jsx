import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import CustomChip from '../../CustomChip';
import Typography from '../../Typography';
import useStyles from './styles';

/**
 * This component renders a post with a file abstract and download
 * @returns File post
 */
export default function FilePost({
  title,
  description,
  items,
  fileTypes,
  url,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDownload(event) {
    if (url.length > 1) {
      setAnchorEl(event.currentTarget);
    } else {
      window.open(url[0].link, '_blank');
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <Typography variant="h3" className={classes.title}>
          {title}
        </Typography>
        {fileTypes?.map((fileType) => (
          <CustomChip
            key={fileType.name}
            bold
            borderColor={fileType.color}
            labelColor={fileType.color}
            style={{ marginRight: 10 }}
          >
            {fileType.name}
          </CustomChip>
        ))}
      </div>
      <Typography variant="body" className={classes.description}>
        {description}
      </Typography>
      <div className={classes.bottom}>
        <div className={classes.itemsWrapper}>
          {items?.map((item) => (
            <div key={`${item.key}-${item.value}`} className={classes.item}>
              <Typography variant="caption" className={classes.itemKey}>
                {item.key}
              </Typography>
              <Typography variant="caption" className={classes.itemValue}>
                {item.value}
              </Typography>
            </div>
          ))}
        </div>{' '}
        <CustomChip
          bold
          borderColor={theme.primary.main}
          labelColor={theme.primary.main}
          icon={<DownloadRoundedIcon style={{ color: theme.primary.main }} />}
          onClick={(event) => handleDownload(event)}
        >
          {t('posts.file.download').toUpperCase()}
        </CustomChip>
        <Menu
          id="posts-menu"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            style: {
              color: theme.secondary.dark,
            },
          }}
          PaperProps={{
            style: { backgroundColor: theme.background.popup },
          }}
        >
          {url.map((item) => (
            <MenuItem
              key={`${item.link}-${item.info}`}
              onClick={() => window.open(item.link, '_blank')}
            >
              <Typography variant="body">{item.info}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}

FilePost.defaultProps = {
  items: undefined,
  fileTypes: undefined,
};

FilePost.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()),
  fileTypes: PropTypes.arrayOf(PropTypes.shape()),
  url: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
