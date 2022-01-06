import React from 'react';

import ApiPost from '../../../components/Posts/Api';

export default function Methods() {
  return (
    <div style={{ maxWidth: 1000 }}>
      <ApiPost
        title="Contagem de estações"
        description="Método que retorna o total de estações."
        url="https://dev-redes-ora.geodatin.com/api/station/count"
        type={{ name: 'GET', color: '#A1BA09' }}
        requisitionExample="https://dev-redes-ora.geodatin.com/api/ostation/count"
        response={[
          {
            key: 'count',
            type: 'number',
            description: 'Contagem numérica de estações',
          },
        ]}
        bodyParams={[
          {
            key: 'count',
            type: 'number',
            description: 'Contagem numérica de estações',
          },
        ]}
        urlParams={[
          {
            key: 'count',
            description: 'Contagem numérica de estações',
          },
        ]}
      />

      <ApiPost
        title="Contagem de estações"
        description="Método que retorna o total de estações."
        url="https://dev-redes-ora.geodatin.com/api/station/count"
        type={{ name: 'GET', color: '#A1BA09' }}
        requisitionExample="https://dev-redes-ora.geodatin.com/api/ostation/count"
        response={[
          {
            key: 'count',
            type: 'number',
            description: 'Contagem numérica de estações',
          },
        ]}
        bodyParams={[
          {
            key: 'count',
            type: 'number',
            description: 'Contagem numérica de estações',
          },
        ]}
        urlParams={[
          {
            key: 'count',
            description: 'Contagem numérica de estações',
          },
        ]}
      />
    </div>
  );
}
