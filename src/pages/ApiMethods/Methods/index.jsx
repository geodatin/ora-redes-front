import PropTypes from 'prop-types';
import React from 'react';

import ApiPost from '../../../components/Posts/Api';
import useStyles from './styles';

/**
 * This function renders a methods list through ApiPost
 * @returns methods list
 */
export default function Methods({ methods }) {
  Methods.propTypes = {
    methods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  const classes = useStyles();

  return (
    <div style={{ maxWidth: 1000 }} className={classes.api}>
      {methods.map((method) => (
        <ApiPost
          title={method.title}
          id={method.id}
          key={method.id}
          description={method.description}
          url={method.url}
          type={method.type}
          requisitionExample={method.requisitionExample}
          response={method.response}
          bodyParams={method.bodyParams}
          urlParams={method.urlParams}
        />
      ))}
    </div>
  );
}
