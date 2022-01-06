import { useMediaQuery } from '@mui/material';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import MobileExpandLayout from '../../components/Layout/Mobile/Expand';
import VLayout from '../../components/Layout/Vertical';
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

  const data = (
    <ul>
      <li> Data 1</li>
      <li> Data 2</li>
      <li> Data 3</li>
      <li> Data 4</li>
      <li> Data 5</li>
      <li> Data 6</li>
      <li> Data 7</li>
      <li> Data 8</li>
      <li> Data 9</li>
      <li> Data 10</li>
      <li> Data 11</li>
      <li> Data 12</li>
      <li> Data 13</li>
      <li> Data 14</li>
      <li> Data 15</li>
      <li> Data 16</li>
      <li> Data 17</li>
      <li> Data 18</li>
      <li> Data 19</li>
      <li> Data 20</li>
    </ul>
  );

  const breadcrumb = (
    <Breadcrumb items={['BIBLIOTECA DE DADOS', 'Todos os arquivos']} />
  );

  return isMobile ? (
    <MobileExpandLayout
      upRowBar={{
        className: classes.breadBarMobileWrapper,
        children: breadcrumb,
      }}
      expandable={{
        className: classes.dataMobileWrapper,
        children: data,
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
        children: data,
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
