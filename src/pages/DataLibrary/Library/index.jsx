import React from 'react';

import FilePost from '../../../components/Posts/File';
import useStyles from './styles';

export default function Library() {
  const classes = useStyles();

  return (
    <div style={{ maxWidth: 1000 }} className={classes.library}>
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
  );
}
