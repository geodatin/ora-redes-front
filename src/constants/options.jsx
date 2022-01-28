export const dataTypes = {
  name: {
    code: 'name',
    translation: 'specific.dataType.name',
    color: 'red',
  },
  network: {
    code: 'network',
    translation: 'specific.dataType.network',
    color: '#A1BA09',
  },
  country: {
    code: 'country',
    translation: 'specific.dataType.country',
    color: '#008CB7',
  },
  responsible: {
    code: 'responsible',
    translation: 'specific.dataType.responsible',
    color: '#FA7B00',
  },
  river: {
    code: 'river',
    translation: 'specific.dataType.river',
    color: 'darkcyan',
  },
  variable: {
    code: 'variable',
    translation: 'specific.dataType.variable.title',
    color: 'green',
    translations: {
      ph: 'specific.dataType.variable.items.ph',
      OD: 'specific.dataType.variable.items.OD',
      electricConductivity:
        'specific.dataType.variable.items.electricConductivity',
      turbidity: 'specific.dataType.variable.items.turbidity',
      sampleTemperature: 'specific.dataType.variable.items.sampleTemperature',
      totalDissolvedSolid:
        'specific.dataType.variable.items.totalDissolvedSolid',
      totalNitrogen: 'specific.dataType.variable.items.totalNitrogen',
      totalOrtophosphate: 'specific.dataType.variable.items.totalOrtophosphate',
      totalSuspensionSolid:
        'specific.dataType.variable.items.totalSuspensionSolid',
      rain: 'specific.dataType.variable.items.rain',
      flowRate: 'specific.dataType.variable.items.flowRate',
      adoptedLevel: 'specific.dataType.variable.items.adoptedLevel',
    },
  },
};

export const countryCodes = {
  8: 'VE',
  5: 'PE',
  4: 'EC',
  7: 'CO',
  9: 'BR',
  6: 'BO',
};

export const networks = {
  all: {
    name: 'all',
    code: 'all',
    translation: 'specific.networks.type.all',
    value: 1,
  },
  hydrologic: {
    name: 'hydrologic',
    code: 'RHA',
    translation: 'specific.networks.type.hydrologic',
    value: 2,
  },
  quality: {
    name: 'quality',
    code: 'RQA',
    translation: 'specific.networks.type.quality',
    value: 3,
  },
  hybam: {
    name: 'hybam',
    code: 'HYBAM',
    translation: 'specific.networks.type.hybam',
    value: 4,
  },
};

export const filterDefaults = {
  autocompleteSelection: {
    name: [],
    network: [],
    country: [],
    responsible: [],
    river: [],
    variable: [],
  },
  networkSelection: networks.all.value,
};
