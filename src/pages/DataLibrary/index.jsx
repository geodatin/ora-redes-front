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
    <Breadcrumb
      items={['BIBLIOTECA DE DADOS', 'Todos os arquivos']}
      onClickItem={() => {}}
    />
  );

  const onCheck = (values) => {};
  const onSearch = (value) => {};

  const filtering = (
    <>
      <Search
        title="SEARCH"
        placeholder="Search here"
        onSearch={onSearch}
        footerString="Showing 34 results"
      />
      <Checklist
        title="CHECKLIST 1"
        items={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']}
        onChange={onCheck}
      />
      <Checklist
        title="CHECKLIST 2"
        items={['Item 1', 'Item 2', 'Item 3', 'Item 4']}
        onChange={onCheck}
      />
      <Checklist
        title="CHECKLIST 3"
        items={['Item 1', 'Item 2', 'Item 3', 'Item 4']}
        onChange={onCheck}
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
        className: classes.filteringMobileWrapper,
        children: filtering,
      }}
      mainContainer={{
        className: classes.libraryMobileWrapper,
        children: <Library />,
      }}
    />
  ) : (
    <HLayout
      leftColumn={{
        className: classes.filteringWrapper,
        children: filtering,
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
