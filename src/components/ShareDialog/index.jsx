/* eslint-disable no-unused-vars */
import { Facebook, Twitter, WhatsApp } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from 'react-share';

import CustomDialog from '../CustomDialog';
import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component encapsulates the share dialog.
 */
export default function ShareDialog({ url, shareMessage, open, onClose }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  const [copied, setCopied] = useState(false);

  /**
   * This function handles the text copy click.
   */
  function copyLink() {
    copy(url);
    setCopied(true);
  }

  /**
   * This function handles the share dialog closing.
   */
  function handleShareClose() {
    setTimeout(() => {
      setCopied(false);
    }, 500);
    onClose();
  }

  return (
    <CustomDialog
      open={open}
      onClose={() => handleShareClose()}
      title={t('share.headerTitle')}
    >
      <Typography variant="caption" style={{ color: theme.neutral.gray.main }}>
        {t('share.page1Text1')}
      </Typography>
      <div className={classes.iconsWrapper}>
        <TwitterShareButton title={shareMessage} url={url}>
          <Button className={classes.shareButton} style={{ marginRight: 5 }}>
            <Twitter className={classes.twitterIcon} />
          </Button>
        </TwitterShareButton>
        <FacebookShareButton
          title={shareMessage}
          url={url}
          style={{ marginRight: 5 }}
        >
          <Button className={classes.shareButton}>
            <Facebook className={classes.facebookIcon} />
          </Button>
        </FacebookShareButton>
        <WhatsappShareButton title={shareMessage} url={url}>
          <Button className={classes.shareButton}>
            <WhatsApp className={classes.whatsappIcon} />
          </Button>
        </WhatsappShareButton>
      </div>
      <Typography variant="caption" style={{ color: theme.neutral.gray.main }}>
        {t('share.page1Text2')}
      </Typography>
      <div className={classes.copyWrapper}>
        <TextField
          variant="outlined"
          classes={{ root: classes.textfieldRoot }}
          size="small"
          value={url}
          inputProps={{
            readOnly: true,
          }}
          onFocus={(event) => {
            event.target.select();
          }}
        />
        <Button
          className={classes.copyButton}
          variant="contained"
          disableElevation
          onClick={() => copyLink()}
        >
          {copied ? t('share.copiedButton') : t('share.copyButton')}
        </Button>
      </div>
    </CustomDialog>
  );
}

ShareDialog.propTypes = {
  url: PropTypes.string.isRequired,
  shareMessage: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
