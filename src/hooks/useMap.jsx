import { useContextSelector } from 'use-context-selector';

import MapContext from '../contexts/mapping';

export function useMap() {
  const mapRef = useContextSelector(
    MapContext,
    (navigation) => navigation.values.mapRef
  );

  const setMapRef = useContextSelector(
    MapContext,
    (navigation) => navigation.setters.setMapRef
  );

  const panOnMap = useContextSelector(
    MapContext,
    (navigation) => navigation.functions.panOnMap
  );

  return { mapRef, setMapRef, panOnMap };
}
