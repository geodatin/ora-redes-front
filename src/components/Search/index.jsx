/* eslint-disable no-unused-vars */
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTheme } from 'react-jss';

import CustomButton from '../CustomButton';
import CustomSearch from '../CustomSearch';
import TitleButton from '../TitleButton';
import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component renders a search
 * @returns search component
 */
export default function Search({ title, placeholder, onSearch, footerString }) {
  Search.propTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    footerString: PropTypes.string.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState('');

  const clearSearch = () => {
    setValue('');
  };

  return (
    <div className={classes.wrapper}>
      <TitleButton
        title={title}
        buttonTitle="CLEAR"
        buttonDisabled={value === ''}
        onClick={clearSearch}
      />

      <CustomSearch
        onSearch={onSearch}
        placeholder={placeholder}
        value={value}
        setValue={setValue}
      />

      {footerString ? (
        <Typography style={{ marginTop: 15, color: theme.neutral.gray.main }}>
          {footerString}
        </Typography>
      ) : (
        <div />
      )}
    </div>
  );
}
