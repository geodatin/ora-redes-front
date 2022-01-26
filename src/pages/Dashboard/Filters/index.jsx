import { ListSubheader, MenuItem } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AdvancedFilter from '../../../components/AdvancedFilter';
import CustomButton from '../../../components/CustomButton';
import CustomChip from '../../../components/CustomChip';
import CustomSelect from '../../../components/CustomSelect';
import TitleButton from '../../../components/TitleButton';
import Typography from '../../../components/Typography';
import {
  dataTypes,
  filterDefaults,
  networks,
} from '../../../constants/options';
import FilteringContext from '../../../contexts/filtering';
import api from '../../../services/api';
import useStyles from './styles';

/**
 * This function provides filters components
 * @returns filters components
 */
export default function Filters() {
  const classes = useStyles();
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [noOptionsTextSelector, setNoOptionsTextSelector] = useState(false);
  const {
    values: { autocompleteSelection, networkSelection },
    setters: { setAutocompleteSelection, setNetworkSelection },
  } = useContext(FilteringContext);
  const { t } = useTranslation();
  const [auxAutocompleteSelection, setAuxAutocompleteSelection] = useState(
    autocompleteSelection
  );
  const [auxNetworkSelection, setAuxNetworkSelection] =
    useState(networkSelection);
  const [applyDisabled, setApplyDisabled] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  function applySelection() {
    setAutocompleteSelection(auxAutocompleteSelection);
    setNetworkSelection(auxNetworkSelection);
    setApplyDisabled(true);
  }

  function clearSelection() {
    setAuxAutocompleteSelection(filterDefaults.autocompleteSelection);
    setAuxNetworkSelection(filterDefaults.networkSelection);
  }

  function removeAutocompleteSelection(toRemove) {
    setAuxAutocompleteSelection((old) =>
      old.filter((item) => item.value !== toRemove.value)
    );
  }

  function onAutocompleteInputChange(newInput) {
    let subscribed = true;

    if (newInput.length > 0) {
      setNoOptionsTextSelector(true);
      setAutocompleteLoading(true);

      api.get(`/station/filter/${newInput}`).then(({ data }) => {
        if (subscribed) {
          const filteredData = data.filter(
            ({ value: v1, type: t1 }) =>
              !auxAutocompleteSelection.some(
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
      !auxAutocompleteSelection.filter((e) => e.value === newItem.value)
        .length > 0
    ) {
      setAuxAutocompleteSelection((old) => [...old, newItem]);
    }
  }

  useEffect(() => {
    if (!firstLoad) {
      setApplyDisabled(false);
    } else {
      setFirstLoad(false);
    }
  }, [auxAutocompleteSelection, auxNetworkSelection]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleButton
        title={t('specific.filters.title')}
        buttonTitle={t('specific.filters.clearButton')}
        buttonDisabled={
          auxAutocompleteSelection.length === 0 &&
          auxNetworkSelection === filterDefaults.networkSelection
        }
        onClick={() => clearSelection()}
      />
      <div>
        <CustomSelect emphasis value={auxNetworkSelection}>
          <MenuItem
            value={networks.all.value}
            onSelect={() => setAuxNetworkSelection(networks.all.value)}
          >
            {t(networks.all.translation)}
          </MenuItem>
        </CustomSelect>
      </div>
      <span className={classes.separator} />
      <div>
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
      <div className={classes.chips} style={{ marginTop: 15 }}>
        {auxAutocompleteSelection.map((option) => (
          <CustomChip
            key={option.value}
            borderColor={dataTypes[option.type].color}
            labelColor={dataTypes[option.type].color}
            onDelete={() => removeAutocompleteSelection(option)}
            style={{ marginRight: 7, marginBottom: 7 }}
          >
            {option.type === dataTypes.variable.code
              ? t(dataTypes.variable.translations[option.value])
              : option.value}
          </CustomChip>
        ))}
        {auxAutocompleteSelection.length === 0 && (
          <Typography className={classes.noSelectionText}>
            {t('specific.filters.noSelection')}
          </Typography>
        )}
      </div>
      <CustomButton
        style={{ marginTop: auxAutocompleteSelection.length > 0 ? 8 : 15 }}
        disabled={applyDisabled}
        onClick={() => applySelection()}
      >
        <Typography>{t('specific.filters.apply')}</Typography>
      </CustomButton>
    </div>
  );
}
