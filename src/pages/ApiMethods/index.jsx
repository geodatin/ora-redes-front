import { useMediaQuery } from '@mui/material';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import MobileExpandLayout from '../../components/Layout/Mobile/Expand';
import VLayout from '../../components/Layout/Vertical';
import { breakpoints } from '../../constants/constraints';
import Methods from './Methods';
import useStyles from './styles';

/**
 * This component renders a API methods page
 * @returns API methods page
 */
export default function ApiMethods() {
  const classes = useStyles();
  const isMobile = useMediaQuery(breakpoints.max.md);

  const methodsList = (
    <ul>
      <li> Methods 1</li>
      <li> Methods 2</li>
      <li> Methods 3</li>
      <li> Methods 4</li>
      <li> Methods 5</li>
      <li> Methods 6</li>
      <li> Methods 7</li>
      <li> Methods 8</li>
      <li> Methods 9</li>
      <li> Methods 10</li>
      <li> Methods 11</li>
      <li> Methods 12</li>
      <li> Methods 13</li>
      <li> Methods 14</li>
      <li> Methods 15</li>
      <li> Methods 16</li>
      <li> Methods 17</li>
      <li> Methods 18</li>
      <li> Methods 19</li>
      <li> Methods 20</li>
    </ul>
  );

  const breadcrumb = <Breadcrumb items={['API', 'Todos os métodos']} />;

  return isMobile ? (
    <MobileExpandLayout
      upRowBar={{
        className: classes.breadBarMobileWrapper,
        children: breadcrumb,
      }}
      expandable={{
        className: classes.methodsListMobileWrapper,
        children: methodsList,
      }}
      mainContainer={{
        className: classes.methodsMobileWrapper,
        children: <Methods />,
      }}
    />
  ) : (
    <HLayout
      leftColumn={{
        className: classes.methodsListWrapper,
        children: methodsList,
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
              className: classes.methodsWrapper,
              children: <Methods />,
            }}
          />
        ),
      }}
    />
  );
}
