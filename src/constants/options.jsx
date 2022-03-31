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
      level: 'specific.dataType.variable.items.level',
    },
    colors: {
      rain: '#008CB7',
      flowRate: '#A1BA09',
      level: '#FA7B00',
      ph: '#00BA4B',
      OD: '#F6505B',
      totalDissolvedSolid: '#8A89FF',
      electricConductivity: '#C84B89',
      turbidity: '#835697',
      sampleTemperature: '#445581',
      totalNitrogen: '#2F4858',
      totalOrtophosphate: '#00C09F',
      totalSuspensionSolid: '#D39300',
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
  ALL: {
    name: 'all',
    translation: 'specific.networks.type.all',
    value: 1,
  },
  RHA: {
    name: 'hydrologic',
    code: 'RHA',
    translation: 'specific.networks.type.hydrologic',
    color: '#00B9F1',
    value: 2,
    charts: [
      { dataType: 'rain', type: 'bar', enableTimeGrouping: true },
      { dataType: 'level', type: 'line', enableTimeGrouping: true },
      { dataType: 'flowRate', type: 'line', enableTimeGrouping: true },
      {
        dataType: 'raw',
        type: 'multiple',
        enableTimeGrouping: true,
      },
    ],
  },
  RQA: {
    name: 'quality',
    code: 'RQA',
    translation: 'specific.networks.type.quality',
    color: '#FA7B00',
    value: 3,
    charts: [
      { dataType: 'turbidity', type: 'line' },
      { dataType: 'ph', type: 'line' },
      { dataType: 'OD', type: 'line' },
      {
        dataType: 'electricConductivity',
        type: 'line',
      },
      { dataType: 'sampleTemperature', type: 'line' },
      {
        dataType: 'totalDissolvedSolid',
        type: 'line',
      },
      { dataType: 'totalNitrogen', type: 'line' },
      { dataType: 'totalOrtophosphate', type: 'line' },
      {
        dataType: 'totalSuspensionSolid',
        type: 'line',
      },
    ],
  },
  HYBAM: {
    name: 'hybam',
    code: 'HYBAM',
    translation: 'specific.networks.type.hybam',
    color: '#A1BA09',
    value: 4,
    charts: [
      { dataType: 'level', type: 'line' },
      { dataType: 'flowRate', type: 'line' },
      { dataType: 'ph', type: 'line' },
      {
        dataType: 'electricConductivity',
        type: 'line',
      },
      { dataType: 'sampleTemperature', type: 'line' },
      { dataType: 'totalOrtophosphate', type: 'line' },
    ],
  },
};

export const networkByValue = {
  1: {
    ...networks.ALL,
  },
  2: {
    ...networks.RHA,
  },
  3: {
    ...networks.RQA,
  },
  4: {
    ...networks.HYBAM,
  },
};

export const notificationsTypes = {
  rain: {
    color: '#00B9F1',
  },
  level: {
    color: '#FA7B00',
  },
  flowRate: {
    color: '#A1BA09',
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
  networkSelection: networks.ALL.value,
};

export const embedItems = [
  {
    key: 'leftBar',
    translation: 'specific.embed.leftBar',
    defaultOption: true,
  },
  {
    key: 'rightBar',
    translation: 'specific.embed.rightBar',
    defaultOption: true,
  },
  { key: 'topBar', translation: 'specific.embed.topBar', defaultOption: true },
  {
    key: 'embeding',
    translation: 'specific.embed.embeding',
    defaultOption: false,
  },
];

export const autocompletePropertyTypes = {
  name: { key: 'name' },
  network: { key: 'network' },
  country: { key: 'country' },
  responsible: { key: 'responsible' },
  river: { key: 'river' },
  variable: { key: 'variable' },
};

export const timeGroupingOptions = [
  {
    code: 'year',
    translation: 'specific.infoPanel.timeGrouping.year',
  },
  {
    code: 'quarter',
    translation: 'specific.infoPanel.timeGrouping.quarter',
  },
  {
    code: 'month',
    translation: 'specific.infoPanel.timeGrouping.month',
  },
  {
    code: 'week',
    translation: 'specific.infoPanel.timeGrouping.week',
  },
  {
    code: 'day',
    translation: 'specific.infoPanel.timeGrouping.day',
  },
  {
    code: 'hour',
    translation: 'specific.infoPanel.timeGrouping.hour',
  },
];

export const panels = {
  statistics: {
    index: 0,
    translation: 'specific.infoPanel.statistics',
  },
  list: {
    index: 1,
    translation: 'specific.dataType.station.plural',
  },
  station: {
    index: 2,
    translation: undefined,
  },
};

export const mobileNavs = {
  map: {
    value: 0,
  },
  filters: {
    value: 1,
  },
  notifications: {
    value: 2,
  },
  panel: {
    value: 3,
  },
};

export const layoutConfigs = {
  isLeftHidden: [false, true, true, false],
  isRightHidden: [false, false, true, true],
};
