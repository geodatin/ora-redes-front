/* eslint-disable no-unused-vars */
import { ListSubheader, MenuItem } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import NavigationContext from '../../../contexts/navigation';
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
    values: {
      autocompleteSelection,
      autocompleteStraightSelection,
      networkSelection,
    },
    setters: {
      setAutocompleteSelection,
      setAutocompleteStraightSelection,
      setNetworkSelection,
    },
    loaders: { paramsLoaded },
  } = useContext(FilteringContext);

  const {
    functions: { handleOnFilterApplied },
  } = useContext(NavigationContext);

  const { t } = useTranslation();
  const [auxAutocompleteSelection, setAuxAutocompleteSelection] = useState(
    autocompleteSelection
  );
  const [auxNetworkSelection, setAuxNetworkSelection] =
    useState(networkSelection);
  const [applyDisabled, setApplyDisabled] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [auxStraightSelection, setAuxStraightSelection] = useState(
    autocompleteStraightSelection
  );

  /**
   * Set the selection to context.
   */
  function applySelection() {
    handleOnFilterApplied();
    setAutocompleteSelection(auxAutocompleteSelection);
    setNetworkSelection(auxNetworkSelection);
    setAutocompleteStraightSelection(auxStraightSelection);
    setApplyDisabled(true);
  }

  /**
   * Clear the aux selection.
   */
  function clearSelection() {
    setAuxAutocompleteSelection(filterDefaults.autocompleteSelection);
    setAuxNetworkSelection(filterDefaults.networkSelection);
  }

  /**
   * Remove an Autocomplete selected item
   */
  function removeAutocompleteSelection(type, value) {
    setAuxAutocompleteSelection((old) => ({
      ...old,
      [type]: old[type].filter((item) => item !== value),
    }));
    setAuxStraightSelection((old) =>
      old.filter((item) => item.value !== value)
    );
  }

  /**
   * Handles the Autocomplete Input Change.
   */
  function onAutocompleteInputChange(newInput) {
    let subscribed = true;

    if (newInput.length > 0) {
      setNoOptionsTextSelector(true);
      setAutocompleteLoading(true);

      api.get(`/station/filter/${newInput}`).then(({ data }) => {
        if (subscribed) {
          const filteredData = data.filter(
            ({ value: v1, type: t1 }) =>
              !auxStraightSelection.some(
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

  /**
   * Handles the Autocomplete Selection.
   */
  function handleOnAutocompleteSelect(newItem) {
    setAutocompleteOptions([]);

    if (!auxAutocompleteSelection[newItem.type].includes(newItem.value)) {
      setAuxAutocompleteSelection((old) => ({
        ...old,
        [newItem.type]: [newItem.value, ...old[newItem.type]],
      }));
      setAuxStraightSelection((old) => [...old, newItem]);
    }
  }

  /**
   * Sets the Apply button disabletion.
   */
  useEffect(() => {
    if (!firstLoad) {
      setApplyDisabled(false);
    } else {
      setFirstLoad(false);
    }
  }, [auxAutocompleteSelection, auxNetworkSelection]);

  /**
   * Count the selection length.
   */
  const selectionSize = useMemo(() => {
    let size = 0;

    Object.keys(auxAutocompleteSelection).forEach((key) => {
      if (auxAutocompleteSelection[key].length > 0) size += 1;
    });

    return size;
  }, [auxAutocompleteSelection]);

  useEffect(() => {
    setAuxNetworkSelection(networkSelection);
    setAuxAutocompleteSelection(autocompleteSelection);
    setAutocompleteStraightSelection(auxStraightSelection);
  }, [paramsLoaded]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleButton
        title={t('specific.filters.title')}
        buttonTitle={t('specific.filters.clearButton')}
        buttonDisabled={
          selectionSize === 0 &&
          auxNetworkSelection === filterDefaults.networkSelection
        }
        onClick={() => clearSelection()}
      />
      <div>
        <CustomSelect value={auxNetworkSelection}>
          <MenuItem
            value={networks.ALL.value}
            onClick={() => setAuxNetworkSelection(networks.ALL.value)}
          >
            {t(networks.ALL.translation)}
          </MenuItem>
          <MenuItem
            value={networks.RHA.value}
            onClick={() => setAuxNetworkSelection(networks.RHA.value)}
          >
            {t(networks.RHA.translation)}
          </MenuItem>
          <MenuItem
            value={networks.HYBAM.value}
            onClick={() => setAuxNetworkSelection(networks.HYBAM.value)}
          >
            {t(networks.HYBAM.translation)}
          </MenuItem>
          <MenuItem
            value={networks.RQA.value}
            onClick={() => setAuxNetworkSelection(networks.RQA.value)}
          >
            {t(networks.RQA.translation)}
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
          getOptionLabel={(option) => {
            if (option.type === dataTypes.variable.code) {
              return t(dataTypes.variable.translations[option.value]);
            }

            return option.value;
          }}
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
        {Object.keys(auxAutocompleteSelection).map((type) =>
          auxAutocompleteSelection[type].map((value) => (
            <CustomChip
              key={value}
              borderColor={dataTypes[type].color}
              labelColor={dataTypes[type].color}
              onDelete={() => removeAutocompleteSelection(type, value)}
              style={{ marginRight: 7, marginBottom: 7 }}
            >
              {type === dataTypes.variable.code
                ? t(dataTypes.variable.translations[value])
                : value}
            </CustomChip>
          ))
        )}
        {selectionSize === 0 && (
          <Typography className={classes.noSelectionText}>
            {t('specific.filters.noSelection')}
          </Typography>
        )}
      </div>
      <CustomButton
        style={{ marginTop: selectionSize > 0 ? 8 : 15 }}
        disabled={applyDisabled}
        onClick={() => applySelection()}
      >
        {t('specific.filters.apply')}
      </CustomButton>
    </div>
  );
}
