import { MenuItem } from '@mui/material';
import React from 'react';

import CustomButton from '../../../components/CustomButton';
import CustomCheckbox from '../../../components/CustomCheckbox';
import CustomSelect from '../../../components/CustomSelect';

/**
 * This function provides filters components
 * @returns filters components
 */
export default function Filters() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 5 }}>
        <CustomButton mini disabled>
          Aplicar
        </CustomButton>
      </div>
      <div style={{ marginBottom: 5 }}>
        <CustomButton mini>Aplicar</CustomButton>
      </div>
      <div>
        <CustomButton style={{ width: '100%' }}>Aplicar</CustomButton>
      </div>
      <div>
        <CustomCheckbox />
      </div>
      <div>
        <CustomSelect
          style={{ width: '100%' }}
          defaultValue="Todas as Redes"
          emphasis
        >
          {['Todas as Redes', 'Redes Hidrológicas'].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </CustomSelect>
      </div>
    </div>
  );
}
