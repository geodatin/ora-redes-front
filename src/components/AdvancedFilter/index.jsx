/* eslint-disable no-unused-vars */
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component renders a advanced filter
 * @returns Advanced Filter
 */
export default function AdvancedFilter({
  TextFieldProps,
  onSelect,
  onInputChange,
  onChange,
  onClose,
  onOpen,
  ...rest
}) {
  const classes = useStyles();
  const theme = useTheme();
  const inputRef = useRef();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      id="search-box"
      autoHighlight
      selectOnFocus
      disableClearable
      classes={{ paper: classes.paper }}
      className={classes.root}
      open={open}
      onOpen={(e) => {
        setOpen(true);
        onOpen(e);
      }}
      onClose={(e) => {
        setOpen(false);
        setInputValue('');
        onClose(e);
      }}
      value={null}
      inputValue={inputValue}
      onInputChange={(e, newValue) => {
        setInputValue(newValue);
        onInputChange(e, newValue);
      }}
      popupIcon={
        open ? (
          <CloseRoundedIcon
            className={classes.addIcon}
            style={{ fontSize: 20, color: theme.secondary.dark }}
          />
        ) : (
          <AddRoundedIcon
            className={classes.addIcon}
            style={{ fontSize: 20, color: theme.secondary.dark }}
          />
        )
      }
      onChange={(e, newValue) => {
        onSelect(newValue);
        onChange(e, newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          margin="none"
          size="small"
          placeholder={t('components.advancedFilter.placeholder')}
          variant="outlined"
          classes={{ root: classes.textfield }}
          fullWidth
          {...TextFieldProps}
        />
      )}
      groupBy={(option) => option.type}
      {...rest}
    />
  );
}

AdvancedFilter.defaultProps = {
  TextFieldProps: {},
  onInputChange: () => {},
  onChange: () => {},
  onClose: () => {},
  onOpen: () => {},
};

AdvancedFilter.propTypes = {
  TextFieldProps: PropTypes.shape(),
  onSelect: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};
