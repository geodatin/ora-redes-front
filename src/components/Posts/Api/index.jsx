import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CustomChip from '../../CustomChip';
import Typography from '../../Typography';
import useStyles from './styles';

/**
 * This component renders a post with a file abstract and download
 * @returns File post
 */
export default function ApiPost({
  title,
  description,
  type,
  url,
  urlParams,
  bodyParams,
  requisitionExample,
  response,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <Typography variant="h3" className={classes.title}>
          {title}
        </Typography>
        <CustomChip
          key={type.name}
          bold
          borderColor={type.color}
          labelColor={type.color}
        >
          {type.name}
        </CustomChip>
      </div>
      <div className={classes.content}>
        <Typography variant="body" className={classes.description}>
          {description}
        </Typography>
        <div className={classes.item}>
          <Typography variant="caption" className={classes.itemTitle}>
            {t('posts.api.url')}
          </Typography>
          <Typography variant="caption">{url}</Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="caption" className={classes.itemTitle}>
            {t('posts.api.urlParams')}
          </Typography>
          {!urlParams ? (
            <Typography variant="caption">{t('posts.api.none')}</Typography>
          ) : (
            <table className={classes.table} cellSpacing={0}>
              <tbody>
                <tr>
                  <th>
                    <Typography variant="caption" className={classes.itemTitle}>
                      {t('posts.api.key')}
                    </Typography>
                  </th>
                  <th>
                    <Typography variant="caption" className={classes.itemTitle}>
                      {t('posts.api.description')}
                    </Typography>
                  </th>
                </tr>
              </tbody>
              {urlParams?.map((item) => (
                <tbody key={item.key}>
                  <tr>
                    <td>
                      <Typography variant="caption">{item.key}</Typography>
                    </td>
                    <td>
                      <Typography variant="caption">
                        {item.description}
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
        <div className={classes.item}>
          <Typography variant="caption" className={classes.itemTitle}>
            {t('posts.api.bodyParams')}
          </Typography>
          {!bodyParams ? (
            <Typography variant="caption">{t('posts.api.none')}</Typography>
          ) : (
            <table className={classes.table} cellSpacing={0}>
              <tbody>
                <tr>
                  <th>
                    <Typography variant="caption" className={classes.itemTitle}>
                      {t('posts.api.key')}
                    </Typography>
                  </th>
                  <th>
                    <Typography variant="caption" className={classes.itemTitle}>
                      {t('posts.api.type')}
                    </Typography>
                  </th>
                  <th>
                    <Typography variant="caption" className={classes.itemTitle}>
                      {t('posts.api.description')}
                    </Typography>
                  </th>
                </tr>
              </tbody>
              {bodyParams?.map((item) => (
                <tbody key={item.key}>
                  <tr>
                    <td>
                      <Typography variant="caption">{item.key}</Typography>
                    </td>
                    <td>
                      <Typography variant="caption">{item.type}</Typography>
                    </td>
                    <td>
                      <Typography variant="caption">
                        {item.description}
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
        <div className={classes.item}>
          <Typography variant="caption" className={classes.itemTitle}>
            {t('posts.api.requisitionExample')}
          </Typography>
          <Typography variant="caption">{requisitionExample}</Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="caption" className={classes.itemTitle}>
            {t('posts.api.answer')}
          </Typography>
          <table className={classes.table} cellSpacing={0}>
            <tbody>
              <tr>
                <th>
                  <Typography variant="caption" className={classes.itemTitle}>
                    {t('posts.api.key')}
                  </Typography>
                </th>
                <th>
                  <Typography variant="caption" className={classes.itemTitle}>
                    {t('posts.api.type')}
                  </Typography>
                </th>
                <th>
                  <Typography variant="caption" className={classes.itemTitle}>
                    {t('posts.api.description')}
                  </Typography>
                </th>
              </tr>
            </tbody>
            {response?.map((item) => (
              <tbody key={item.key}>
                <tr>
                  <td>
                    <Typography variant="caption">{item.key}</Typography>
                  </td>
                  <td>
                    <Typography variant="caption">{item.type}</Typography>
                  </td>
                  <td>
                    <Typography variant="caption">
                      {item.description}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
ApiPost.defaultProps = {
  urlParams: undefined,
  bodyParams: undefined,
};

ApiPost.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.shape().isRequired,
  url: PropTypes.string.isRequired,
  urlParams: PropTypes.arrayOf(PropTypes.shape()),
  bodyParams: PropTypes.arrayOf(PropTypes.shape()),
  requisitionExample: PropTypes.string.isRequired,
  response: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
