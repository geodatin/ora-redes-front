import React from 'react';

import AdvancedFilter from '../../../components/AdvancedFilter';

/**
 * This function provides filters components
 * @returns filters components
 */
export default function Filters() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 5 }}>
        <AdvancedFilter
          onSelect={(e) => console.log(e)}
          options={[
            { label: '1', type: 1994 },
            { label: '2', type: 1994 },
            { label: '3', type: 1994 },
            { label: '4', type: 1994 },
            { label: '555', type: 1994 },
            { label: '66666', type: 1995 },
            { label: '77777', type: 1996 },
            { label: '88888', type: 1996 },
            { label: '99999', type: 1996 },
            { label: '999999', type: 1996 },
            { label: '9999999', type: 1997 },
            { label: '99999999', type: 1997 },
            { label: '99999999912', type: 2010 },
            { label: '999999999999', type: 2010 },
            { label: '9999999999991', type: 2010 },
          ]}
        />
      </div>
    </div>
  );
}
