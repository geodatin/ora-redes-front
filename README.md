<div align="center" >
  <img src="https://user-images.githubusercontent.com/56658900/230169451-c57e0e41-19e8-4d40-8872-6d5f4362fe3b.png" width="40px" alt="Logo"/>        <p>Observatório Regional Amazônico - Redes</p>
</div>

### Sobre

- O módulo Redes Amazônicas é uma ferramenta integrante do Observatório Regional Amazônico (ORA), gerenciado pela Secretaria Permanente da Organização do Tratado de Cooperação Amazônica (SP/OTCA) e que permite o acesso aos dados telemétricos e de estações convencionais coletados pelos países membros da OTCA, reunindo dados de chuvas, níveis e vazões de rios, além de informações sobre vazões afluentes, defluentes, níveis e volumes de vários reservatórios na Bacia Amazônica.

- Trata-se de uma importante ferramenta para a sociedade e instituições públicas e privadas, pois os dados coletados pelas estações hidrometeorológicas são imprescindíveis para a gestão dos recursos hídricos e em diversas atividades econômicas, como geração de energia, irrigação, navegação e indústria, além do projeto, manutenção e operação de infraestrutura hidráulica de pequeno e grande porte, como barragens, drenagem pluvial urbana e mesmo bueiros e telhados.

- Por meio dessas informações, pode-se, ainda, acompanhar a ocorrência de eventos hidrológicos considerados críticos, inundações e secas, e se planejar medidas de mitigação dos impactos decorrente desses eventos. Mais que acompanhar esses fenômenos, o conjunto de dados também permite, em diversos casos, a simulação e previsão de eventos hidrológicos e de seus impactos em áreas urbanas ou rurais em diversas bacias hidrográficas.

- Os dados disponíveis por meio do módulo Redes Amazônicas são coletados em Plataformas de Coletas de Dados (PCDs) cuja operação e manutenção em campo é realizada por técnicos em hidrologia e engenheiros hidrólogos dos órgãos de recursos hídricos dos países membros, que são responsáveis pelo planejamento, normatização de procedimentos e equipamentos, fiscalização, organização dos dados hidrometeorológicos e sua publicação.

##### ISENÇÃO DE RESPONSABILIDADE SOBRE OS DADOS HIDROLÓGICOS BRUTOS

- Os dados disponibilizados por meio do módulo Redes Amazônicas são dados brutos obtidos em diversas fontes, desde dados de nível de rio e chuva - coletados automaticamente por meio de Plataformas de Coleta de Dados (PCDs) e transmitidos por satélites a dados coletados por observadores locais e transmitidos à SP/OTCA.

- Tais dados são classificados como brutos, ou seja, não passaram ainda por análises detalhadas, quando são revisados e eventualmente corrigidos. Os dados brutos podem ser imprecisos devido ao mau funcionamento dos equipamentos (PCDs e sensores de medição) ou por causa de alterações físicas no local de medição. A operação e manutenção dessas estações em campo podem resultar na alteração significativa dos dados. Portanto, os dados hidrológicos são provisórios e sujeitos a revisão.

- Os usuários devem considerar a natureza provisória desses dados hidrológicos antes de utilizá-los para a tomada de decisões relacionadas à segurança pessoal ou pública ou em projetos que envolvam consequências financeiras ou operacionais significativas.

- Informações sobre a precisão e o uso apropriado desses dados hidrológicos podem ser obtidas entrando em contato com a entidade responsável de cada país. Os dados são divulgados sob a condição de que nem os Países Membro nem a SP/OTCA sejam responsabilizados por quaisquer danos resultantes de seu uso autorizado ou não autorizado.


### Rodando aplicação

#### Criar um arquivo .env com os seguintes dados:
- REACT_APP_API_URL
- REACT_APP_URL_BASE

```bash
# Clone este repositório
$ git clone https://github.com/geodatin/ora-redes-front.git
# Acesse a pasta do projeto no terminal/cmd
$ cd ora-redes-front

# Instale as dependências
$ yarn ou npm install

# Rode a aplicação
$ yarn dev ou npm run dev

Acesse : http://localhost:3000/

```
