/* eslint-disable no-unused-vars */
import { Facebook, Twitter, WhatsApp } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';
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
export default function ShareDialog({
  url,
  shareMessage,
  open,
  setOpen,
  onClose,
  embedItems,
  customParam,
  embedEnabled,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  const [copied, setCopied] = useState(false);
  const [openEmbed, setOpenEmbed] = useState(false);
  const [embedValues, setEmbedValues] = useState({});

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

  const code = useMemo(() => {
    let embedQuery = `/embed?`;

    if (customParam.length > 1) {
      embedQuery += customParam;
    }

    const initialSize = embedQuery.length;

    /**
     * This function verifies if there is a need to add a separator between the query params.
     */
    function trySeparator() {
      if (embedQuery.length > initialSize || customParam.length > 1) {
        embedQuery += '&';
      }
    }

    Object.keys(embedValues).forEach((key) => {
      trySeparator();
      embedQuery += `${key}=${embedValues[key]}`;
    });

    return `<iframe src="${window.location.origin}${embedQuery}" width="900" height="700"></iframe>`;
  }, [embedValues, customParam]);

  useEffect(() => {
    if (embedItems) {
      const itemsValues = {};

      embedItems.forEach((item) => {
        itemsValues[item.key] = item.defaultOption;
      });

      setEmbedValues(itemsValues);
    }
  }, [embedItems]);

  return (
    <>
      <CustomDialog
        open={open}
        onClose={() => handleShareClose()}
        title={t('share.headerTitle')}
      >
        <Typography
          variant="caption"
          style={{ color: theme.neutral.gray.main }}
        >
          {t('share.page1Text1')}
        </Typography>
        <div className={classes.iconsWrapper}>
          <TwitterShareButton
            title={shareMessage}
            url={url}
            className={classes.shareButton}
            style={{ marginRight: 5 }}
          >
            <Twitter className={classes.twitterIcon} />
          </TwitterShareButton>
          <FacebookShareButton
            title={shareMessage}
            url={url}
            style={{ marginRight: 5 }}
            className={classes.shareButton}
          >
            <Facebook className={classes.facebookIcon} />
          </FacebookShareButton>
          <WhatsappShareButton
            title={shareMessage}
            url={url}
            className={classes.shareButton}
          >
            <WhatsApp className={classes.whatsappIcon} />
          </WhatsappShareButton>
        </div>
        <Typography
          variant="caption"
          style={{ color: theme.neutral.gray.main }}
        >
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
        {embedEnabled && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
          >
            <Button
              className={classes.embedButton}
              disableElevation
              onClick={() => {
                setOpenEmbed(true);
                onClose();
              }}
            >
              {t('share.embedButton')}
            </Button>
          </div>
        )}
      </CustomDialog>
      <CustomDialog
        open={openEmbed}
        onClose={() => setOpenEmbed(false)}
        title={t('share.embedTitle')}
      >
        <Typography
          variant="caption"
          style={{ color: theme.neutral.gray.main }}
        >
          {t('share.page2Text1')}
        </Typography>
        <div className={classes.copyWrapper}>
          <FormGroup className={classes.formGroup}>
            {embedItems?.map((item, index) => {
              if (index % 2 !== 0) return undefined;

              return (
                <FormControlLabel
                  key={item.key}
                  control={
                    <Checkbox size="medium" checked={embedValues[item.key]} />
                  }
                  label={item.translation}
                  onChange={(e, newValue) => {
                    setEmbedValues((old) => ({ ...old, [item.key]: newValue }));
                  }}
                  className={
                    item ? classes.formLabelChecked : classes.formLabelDisabled
                  }
                />
              );
            })}
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            {embedItems?.map((item, index) => {
              if (index % 2 === 0) return undefined;

              return (
                <FormControlLabel
                  key={item.key}
                  control={
                    <Checkbox size="medium" checked={embedValues[item.key]} />
                  }
                  label={t(item.translation)}
                  onChange={(e, newValue) => {
                    setEmbedValues((old) => ({ ...old, [item.key]: newValue }));
                  }}
                  className={
                    item ? classes.formLabelChecked : classes.formLabelDisabled
                  }
                />
              );
            })}
          </FormGroup>
        </div>
        <Typography
          variant="caption"
          style={{ color: theme.neutral.gray.main }}
        >
          {t('share.page2Text2')}
        </Typography>
        <div className={classes.copyWrapper}>
          <TextField
            variant="outlined"
            classes={{ root: classes.embedTextfieldRoot }}
            size="small"
            value={code}
            multiline
            maxRows={6}
          />
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}
        >
          <Button
            className={classes.embedButton}
            disableElevation
            onClick={() => {
              setOpen(true);
              setOpenEmbed(false);
            }}
          >
            {t('share.linkShareButton')}
          </Button>
        </div>
      </CustomDialog>
    </>
  );
}

ShareDialog.defaultProps = {
  embedItems: undefined,
  customParam: '',
  embedEnabled: true,
};

ShareDialog.propTypes = {
  url: PropTypes.string.isRequired,
  shareMessage: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  embedItems: PropTypes.arrayOf(PropTypes.shape()),
  customParam: PropTypes.string,
  embedEnabled: PropTypes.bool,
};
