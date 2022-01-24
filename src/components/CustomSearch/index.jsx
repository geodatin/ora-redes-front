import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component renders a custom search
 * @returns search component
 */
export default function CustomSearch({
  placeholder,
  onSearch,
  value,
  setValue,
}) {
  CustomSearch.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.searchField}>
      <InputBase
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearch(value);
          }
        }}
        style={{ color: theme.secondary.main }}
        fullWidth
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <IconButton onClick={() => onSearch(value)} aria-label="search">
        <SearchIcon style={{ color: theme.secondary.main }} />
      </IconButton>
    </div>
  );
}
