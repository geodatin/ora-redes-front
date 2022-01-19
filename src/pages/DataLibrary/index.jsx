/* eslint-disable no-unused-vars */
import { useMediaQuery } from '@mui/material';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import Checklist from '../../components/Checklist';
import HLayout from '../../components/Layout/Horizontal';
import MobileExpandLayout from '../../components/Layout/Mobile/Expand';
import VLayout from '../../components/Layout/Vertical';
import Search from '../../components/Search';
import { breakpoints } from '../../constants/constraints';
import Library from './Library';
import useStyles from './styles';

/**
 * This component renders a data library page
 * @returns data library page
 */
export default function DataLibrary() {
  const classes = useStyles();
  const isMobile = useMediaQuery(breakpoints.max.md);

  const breadcrumb = (
    <Breadcrumb items={['BIBLIOTECA DE DADOS', 'Todos os arquivos']} />
  );

  const onChangeC1 = (values) => {};
  const onChangeC2 = (values) => {};
  const onSearch = (value) => {};

  const checklists = (
    <>
      <Search
        title="SEARCH"
        label="Search here"
        onSearch={onSearch}
        resultsAmount={0}
      />
      <Checklist
        title="CHECKLIST 1"
        items={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']}
        onChange={onChangeC1}
      />
      <Checklist
        title="CHECKLIST 2"
        items={['Item 1', 'Item 2', 'Item 3', 'Item 4']}
        onChange={onChangeC2}
      />
    </>
  );

  return isMobile ? (
    <MobileExpandLayout
      upRowBar={{
        className: classes.breadBarMobileWrapper,
        children: breadcrumb,
      }}
      expandable={{
        className: classes.dataMobileWrapper,
        children: checklists,
      }}
      mainContainer={{
        className: classes.libraryMobileWrapper,
        children: <Library />,
      }}
    />
  ) : (
    <HLayout
      leftColumn={{
        className: classes.dataWrapper,
        children: checklists,
      }}
      mainContainer={{
        className: classes.breadMapWrapper,
        children: (
          <VLayout
            upRow={{
              className: classes.breadBarWrapper,
              children: breadcrumb,
            }}
            mainContainer={{
              className: classes.libraryWrapper,
              children: <Library />,
            }}
          />
        ),
      }}
    />
  );
}
