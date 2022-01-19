import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTheme } from 'react-jss';

import CustomButton from '../CustomButton';
import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component renders a search
 * @returns search component
 */
export default function Search({ title, label, onSearch, resultsAmount }) {
  Search.propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    resultsAmount: PropTypes.number.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState('');

  const clearSearch = () => {
    setValue('');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.titleHeader}>
        <Typography>{title?.toUpperCase()}</Typography>
        <CustomButton
          mini
          disabled={value === ''}
          onClick={() => clearSearch()}
        >
          CLEAR
        </CustomButton>

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
            placeholder={label}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <IconButton onClick={() => onSearch(value)} aria-label="search">
            <SearchIcon style={{ color: theme.secondary.main }} />
          </IconButton>
        </div>
        {resultsAmount > 0 ? (
          <Typography style={{ marginTop: 15, color: theme.neutral.gray.main }}>
            Showing {resultsAmount} results
          </Typography>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
