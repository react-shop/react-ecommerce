"use strict";
exports.__esModule = true;
var colors = {
    primary: '#43FECB',
    secondary: '#743AF2',
    primaryDark: '#1BE0AB',
    error: '#FF3773',
    black: '#1F1F24',
    blackNormal: '#34353D',
    blackDark: '#27272D',
    blackLight: '#484854',
    white: '#FFFFFF',
    gray: '#737380'
};
var viewports = {
    smartphone: '360px',
    tablet: '720px',
    desktop: '1280px'
};
var fonts = {
    sizes: {
        heading: '32px',
        subHeading: '24px',
        body: '16px',
        text: '14px'
    },
    weight: {
        thin: 100,
        semiBold: 600,
        regular: 400,
        bold: 700,
        black: 900
    }
};
var theme = Object.freeze({
    colors: colors,
    viewports: viewports,
    fonts: fonts
});
exports["default"] = theme;
