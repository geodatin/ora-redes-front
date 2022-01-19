import PropTypes from 'prop-types';
import React from 'react';

import ChartContainer from '../../ChartContainer';

/**
 * This component renders a Custom HTML Chart
 * @returns Custom HTML Chart
 */
export default function CustomChart({ title, info, data }) {
  CustomChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape().isRequired,
  };

  return (
    <ChartContainer title={title} info={info} isLoaded={data != null}>
      <div>Hello custom chart</div>
    </ChartContainer>
  );
}
