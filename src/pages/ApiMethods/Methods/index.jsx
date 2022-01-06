import PropTypes from 'prop-types';
import React from 'react';

import ApiPost from '../../../components/Posts/Api';

export default function Methods({ methods }) {
  Methods.propTypes = {
    methods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  return (
    <div style={{ maxWidth: 1000 }}>
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
