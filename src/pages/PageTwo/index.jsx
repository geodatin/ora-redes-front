import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import VLayout from '../../components/Layout/Vertical';
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
              children: <div>Docs</div>,
            }}
          />
        ),
      }}
    />
  );
}
