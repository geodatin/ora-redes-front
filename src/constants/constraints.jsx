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
    sizes: {
      width: 250,
    },
  },
  upRow: {
    sizes: {
      height: 50,
    },
  },
  downRow: {
    sizes: {
      height: 40,
    },
  },
  rightColumn: {
    sizes: {
      width: 250,
    },
  },
  mobile: {
    navbar: {
      height: 60,
    },
  },
};

export const transitions = {
  bgColor: 'background-color 0.15s ease',
};
