export const breakpoints = {
  min: {
    xsm: '@media (min-width: 401px)',
    sm: '@media (min-width: 601px)',
    smd: '@media (min-width: 801px)',
    md: '@media (min-width: 901px)',
    lg: '@media (min-width: 1281px)',
  },
  max: {
    xsm: '@media (max-width: 400px)',
    sm: '@media (max-width: 600px)',
    smd: '@media (max-width: 800px)',
    md: '@media (max-width: 900px)',
    lg: '@media (max-width: 1280px)',
  },
};

export const layout = {
  header: {
    sizes: {
      height: 50,
    },
  },
  leftColumn: {
    enabled: true,
    sizes: {
      width: 250,
    },
  },
  mainContainer: {
    sizes: {
      width: () =>
        `calc(100% - ${
          (layout.leftColumn.enabled ? layout.leftColumn.sizes.width : 0) +
          (layout.rightColumn.enabled ? layout.rightColumn.sizes.width : 0)
        }px)`,
    },
  },
  rightColumn: {
    enabled: true,
    sizes: {
      width: 250,
    },
  },
};

export const transitions = {
  bgColor: 'background-color 0.15s ease',
};
