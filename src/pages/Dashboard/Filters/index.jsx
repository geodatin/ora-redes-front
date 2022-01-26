import { ListSubheader, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AdvancedFilter from '../../../components/AdvancedFilter';
import CustomChip from '../../../components/CustomChip';
import CustomSelect from '../../../components/CustomSelect';
import { dataTypes } from '../../../constants/definitions';
import api from '../../../services/api';
import useStyles from './styles';

/**
 * This function provides filters components
 * @returns filters components
 */
export default function Filters() {
  const classes = useStyles();
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [autocompleteSelection, setAutocompleteSelection] = useState([]);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [noOptionsTextSelector, setNoOptionsTextSelector] = useState(false);
  const { t } = useTranslation();

  function onAutocompleteInputChange(newInput) {
    let subscribed = true;

    if (newInput.length > 0) {
      setNoOptionsTextSelector(true);
      setAutocompleteLoading(true);

      api.get(`/station/filter/${newInput}`).then(({ data }) => {
        if (subscribed) {
          const filteredData = data.filter(
            ({ value: v1, type: t1 }) =>
              !autocompleteSelection.some(
                ({ value: v2, type: t2 }) => v1 === v2 && t1 === t2
              )
          );
          setAutocompleteOptions(filteredData);
          setAutocompleteLoading(false);
        }
      });
    } else {
      setNoOptionsTextSelector(false);
      setAutocompleteOptions([]);
    }

    return () => {
      subscribed = false;
    };
  }

  function handleOnAutocompleteSelect(newItem) {
    setAutocompleteOptions([]);

    if (
      !autocompleteSelection.filter((e) => e.value === newItem.value).length > 0
    ) {
      setAutocompleteSelection((old) => [...old, newItem]);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 5 }}>
        <AdvancedFilter
          onSelect={(e) => {
            handleOnAutocompleteSelect(e);
          }}
          options={autocompleteOptions}
          onInputChange={(e, newInput) => onAutocompleteInputChange(newInput)}
          getOptionLabel={(option) => option.value}
          onOpen={() => setAutocompleteOptions([])}
          onClose={() => setAutocompleteOptions([])}
          noOptionsText={
            noOptionsTextSelector
              ? t('specific.autocomplete.noOptionsText')
              : t('specific.autocomplete.emptyText')
          }
          loadingText={t('specific.autocomplete.loadingText')}
          loading={autocompleteLoading}
          renderGroup={(params, index) => [
            <ListSubheader
              classes={{ root: classes.autocompleteGroup }}
              key={`${params.group}_${index}`}
              component="div"
            >
              {t(dataTypes[params.group].translation)}
            </ListSubheader>,
            params.children,
          ]}
          paperClass={classes.autocompletePaper}
        />
      </div>
      <div className={classes.chips}>
        {autocompleteSelection.map((option) => (
          <CustomChip
            key={option.value}
            borderColor={dataTypes[option.type].color}
            labelColor={dataTypes[option.type].color}
            className={classes.chip}
          >
            {option.type === dataTypes.variable.code
              ? t(dataTypes.variable.translations[option.value])
              : option.value}
          </CustomChip>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 5 }}>
          <CustomSelect value={2}>
            <MenuItem value={1}>Elemento 1</MenuItem>
            <MenuItem value={2}>Elemento 2</MenuItem>
            <MenuItem value={3}>Elemento 3</MenuItem>
          </CustomSelect>
        </div>
      </div>
    </div>
  );
}
