/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import api from '../../../../../services/api';
import { CustomLineChart } from './CustomCharts/CustomLineChart';

/**
 * This function provides time series of a station
 * @returns TimeSeries
 */
export default function HistoricTimeSeries({ station, chartFetches }) {
  HistoricTimeSeries.propTypes = {
    station: PropTypes.shape(),
    chartFetches: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  HistoricTimeSeries.defaultProps = {
    station: {},
  };

  const [availableCharts, setAvailableCharts] = useState([]);

  /**
   * This userEffect fetch data chart time series.
   */
  useEffect(() => {
    let isSubscribed = true;

    if (station.code) {
      chartFetches.forEach(({ dataType }) => {
        api
          .get(
            `/observation/timeSeries/${station.network.toLowerCase()}/${
              station.code
            }/${dataType}/hour`
          )
          .then(({ data }) => {
            if (isSubscribed && data) {
              const hasDataOnY = data?.y?.some((y) => y !== null);
              if (hasDataOnY)
                setAvailableCharts((prev) => [...prev, { dataType, data }]);
            }
          });
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, [station]);

  return (
    <>
      {availableCharts.map((chart) => (
        <CustomLineChart
          key={chart.dataType}
          data={chart.data}
          dataType={chart.dataType}
          station={station}
        />
      ))}
    </>
  );
}
