import { useContextSelector } from 'use-context-selector';

import { timeGroupingOptions } from '../constants/options';
import FilteringContext from '../contexts/filtering';

export function useTimeGrouping() {
  const timeGroupingIndexValue = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.timeGroupingIndexValue
  );

  const handleOnChangeTimeGrouping = useContextSelector(
    FilteringContext,
    (filtering) => filtering.functions.handleOnChangeTimeGrouping
  );

  const timeGrouping = timeGroupingOptions[timeGroupingIndexValue].code;

  return {
    timeGrouping,
    timeGroupingIndexValue,
    handleOnChangeTimeGrouping,
  };
}
