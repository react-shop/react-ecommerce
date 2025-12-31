/**
 * Design tokens for the ecommerce design system
 * These tokens are defined in panda.config.ts
 * This file provides TypeScript types and documentation
 */

export const tokens = {
  colors: {
    brand: 'Ecommerce brand colors',
    neutral: 'Neutral gray scale',
    success: 'Success state colors',
    error: 'Error state colors',
    warning: 'Warning state colors',
  },
  semanticColors: {
    bg: 'Background colors with theme support',
    text: 'Text colors with theme support',
    border: 'Border colors with theme support',
    primary: 'Primary action colors',
  },
  fonts: {
    heading: 'Font for headings',
    body: 'Font for body text',
    mono: 'Monospace font',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    48: '192px',
    56: '224px',
    64: '256px',
  },
  radii: {
    none: '0',
    sm: '2px',
    base: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },
} as const;

export type ColorToken = keyof typeof tokens.colors;
export type SemanticColorToken = keyof typeof tokens.semanticColors;
export type FontToken = keyof typeof tokens.fonts;
export type FontSizeToken = keyof typeof tokens.fontSizes;
export type SpacingToken = keyof typeof tokens.spacing;
export type RadiusToken = keyof typeof tokens.radii;

