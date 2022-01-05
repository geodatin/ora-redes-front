import React from 'react';

import ApiPost from '../../../components/Posts/Api';
import FilePost from '../../../components/Posts/File';

export default function Docs() {
  return (
    <div>
      <FilePost
        title="Tabela de estações fluviométricas"
        description="Pensando mais a longo prazo, a utilização de recursos de hardware dedicados conduz a um melhor balancemanto de carga da utilização dos serviços nas nuvens. No entanto, não podemos esquecer que a disponibilização de ambientes faz parte de um processo de gerenciamento de memória avançado dos paradigmas de desenvolvimento de software. "
        items={[
          { key: 'País', value: 'Brasil' },
          {
            key: 'Instituição',
            value: 'Agência Nacional de Águas',
          },
        ]}
        fileTypes={[
          { name: 'CSV', color: '#FA7B00' },
          { name: 'PDF', color: '#A1BA09' },
        ]}
        url={[
          {
            link: 'https://speed.hetzner.de/100MB.bin',
            info: 'Baixar CSV',
          },
          {
            link: 'https://speed.hetzner.de/100MB.bin',
            info: 'Baixar PDF',
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
