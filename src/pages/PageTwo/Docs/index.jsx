import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import React from 'react';

import CustomChip from '../../../components/CustomChip';

export default function Docs() {
  return (
    <div>
      <CustomChip
        onDelete={() => {}}
        onClick={() => {}}
        borderColor="#A1BA09"
        labelColor="#A1BA09"
      >
        Brasil
      </CustomChip>
      <CustomChip
        onDelete={() => {}}
        onClick={() => {}}
        borderColor="red"
        labelColor="red"
        deleteColor="red"
      >
        China
      </CustomChip>
      <CustomChip
        icon={<DownloadRoundedIcon style={{ color: 'orange' }} />}
        onClick={() => {}}
        borderColor="orange"
        labelColor="orange"
      >
        Download
      </CustomChip>
      <CustomChip>Simple</CustomChip>
      <CustomChip bold>Bold</CustomChip>
      <CustomChip
        onClick={() => {}}
        borderColor="#A1BA09"
        labelColor="#A1BA09"
        bold
      >
        GET
      </CustomChip>
    </div>
  );
}
