import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import CustomChip from '../../components/CustomChip';
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
              children: (
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
              ),
            }}
          />
        ),
      }}
    />
  );
}
