import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import VLayout from '../../components/Layout/Vertical';
import FilePost from '../../components/Posts/File';
import useStyles from './styles';
/**
 * This component renders a page
 * @returns page two
 */
export default function PageTwo() {
  const classes = useStyles();

  return (
    <HLayout
      leftColumn={{
        className: classes.searchWrapper,
        children: <div>Search</div>,
      }}
      mainContainer={{
        className: classes.breadMapWrapper,
        children: (
          <VLayout
            upRow={{
              className: classes.breadBarWrapper,
              children: (
                <Breadcrumb items={['Biblioteca de dados', 'Todas as redes']} />
              ),
            }}
            mainContainer={{
              className: classes.docsWrapper,
              children: (
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
                </div>
              ),
            }}
          />
        ),
      }}
    />
  );
}
