const colors = {
  primary: '#43FECB',
  secondary: '#743AF2',
  primaryDark: '#1BE0AB',
  error: '#FF3773',
  black: '#1F1F24',
  blackNormal: '#34353D',
  blackDark: '#27272D',
  blackLight: '#484854',
  white: '#FFFFFF',
  gray: '#737380',
};

const viewports = {
  smartphone: '360px',
  tablet: '720px',
  desktop: '1280px',
};

const fonts = {
  weight: {
    thin: 100,
    semiBold: 600,
    regular: 400,
    bold: 700,
    black: 900,
  },
};


const theme = Object.freeze({
  colors,
  viewports,
  fonts,
});

export default theme;
