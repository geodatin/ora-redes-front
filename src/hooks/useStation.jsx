import { useContextSelector } from 'use-context-selector';

import NavigationContext from '../contexts/navigation';

export function useStation() {
  const station = useContextSelector(
    NavigationContext,
    (navigation) => navigation.values.station
  );

  const openStation = useContextSelector(
    NavigationContext,
    (navigation) => navigation.functions.openStation
  );

  const closeStation = useContextSelector(
    NavigationContext,
    (navigation) => navigation.functions.closeStation
  );

  const refreshStation = useContextSelector(
    NavigationContext,
    (navigation) => navigation.functions.refreshStation
  );

  return { station, openStation, closeStation, refreshStation };
}
