import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Where to look for your CSS declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Output directory for generated files
  outdir: 'styled-system',

  // Enable JSX style props
  jsxFramework: 'react',

  // Theme configuration
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      tokens: {
        colors: {
          // Brand colors
          brand: {
            50: { value: '#f0f9ff' },
            100: { value: '#e0f2fe' },
            200: { value: '#bae6fd' },
            300: { value: '#7dd3fc' },
            400: { value: '#38bdf8' },
            500: { value: '#0ea5e9' },
            600: { value: '#0284c7' },
            700: { value: '#0369a1' },
            800: { value: '#075985' },
            900: { value: '#0c4a6e' },
            950: { value: '#082f49' },
          },
          // Neutral colors
          neutral: {
            50: { value: '#fafafa' },
            100: { value: '#f5f5f5' },
            200: { value: '#e5e5e5' },
            300: { value: '#d4d4d4' },
            400: { value: '#a3a3a3' },
            500: { value: '#737373' },
            600: { value: '#525252' },
            700: { value: '#404040' },
            800: { value: '#262626' },
            900: { value: '#171717' },
            950: { value: '#0a0a0a' },
          },
          // Success colors
          success: {
            50: { value: '#f0fdf4' },
            100: { value: '#dcfce7' },
            200: { value: '#bbf7d0' },
            300: { value: '#86efac' },
            400: { value: '#4ade80' },
            500: { value: '#22c55e' },
            600: { value: '#16a34a' },
            700: { value: '#15803d' },
            800: { value: '#166534' },
            900: { value: '#14532d' },
            950: { value: '#052e16' },
          },
          // Error colors
          error: {
            50: { value: '#fef2f2' },
            100: { value: '#fee2e2' },
            200: { value: '#fecaca' },
            300: { value: '#fca5a5' },
            400: { value: '#f87171' },
            500: { value: '#ef4444' },
            600: { value: '#dc2626' },
            700: { value: '#b91c1c' },
            800: { value: '#991b1b' },
            900: { value: '#7f1d1d' },
            950: { value: '#450a0a' },
          },
          // Warning colors
          warning: {
            50: { value: '#fffbeb' },
            100: { value: '#fef3c7' },
            200: { value: '#fde68a' },
            300: { value: '#fcd34d' },
            400: { value: '#fbbf24' },
            500: { value: '#f59e0b' },
            600: { value: '#d97706' },
            700: { value: '#b45309' },
            800: { value: '#92400e' },
            900: { value: '#78350f' },
            950: { value: '#451a03' },
          },
        },
        fonts: {
          heading: { value: 'var(--font-heading), system-ui, sans-serif' },
          body: { value: 'var(--font-body), system-ui, sans-serif' },
          mono: { value: 'ui-monospace, monospace' },
        },
        fontSizes: {
          xs: { value: '0.75rem' },
          sm: { value: '0.875rem' },
          md: { value: '1rem' },
          lg: { value: '1.125rem' },
          xl: { value: '1.25rem' },
          '2xl': { value: '1.5rem' },
          '3xl': { value: '1.875rem' },
          '4xl': { value: '2.25rem' },
          '5xl': { value: '3rem' },
          '6xl': { value: '3.75rem' },
          '7xl': { value: '4.5rem' },
        },
        fontWeights: {
          light: { value: '300' },
          normal: { value: '400' },
          medium: { value: '500' },
          semibold: { value: '600' },
          bold: { value: '700' },
          extrabold: { value: '800' },
        },
        lineHeights: {
          none: { value: '1' },
          tight: { value: '1.25' },
          snug: { value: '1.375' },
          normal: { value: '1.5' },
          relaxed: { value: '1.625' },
          loose: { value: '2' },
        },
        spacing: {
          0: { value: '0' },
          1: { value: '0.25rem' },
          2: { value: '0.5rem' },
          3: { value: '0.75rem' },
          4: { value: '1rem' },
          5: { value: '1.25rem' },
          6: { value: '1.5rem' },
          8: { value: '2rem' },
          10: { value: '2.5rem' },
          12: { value: '3rem' },
          16: { value: '4rem' },
          20: { value: '5rem' },
          24: { value: '6rem' },
          32: { value: '8rem' },
          40: { value: '10rem' },
          48: { value: '12rem' },
          56: { value: '14rem' },
          64: { value: '16rem' },
        },
        radii: {
          none: { value: '0' },
          sm: { value: '0.125rem' },
          base: { value: '0.25rem' },
          md: { value: '0.375rem' },
          lg: { value: '0.5rem' },
          xl: { value: '0.75rem' },
          '2xl': { value: '1rem' },
          '3xl': { value: '1.5rem' },
          full: { value: '9999px' },
        },
        shadows: {
          xs: { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
          sm: { value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
          md: { value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
          lg: { value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
          xl: { value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
          '2xl': { value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
          inner: { value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' },
        },
        zIndex: {
          hide: { value: '-1' },
          base: { value: '0' },
          docked: { value: '10' },
          dropdown: { value: '1000' },
          sticky: { value: '1100' },
          banner: { value: '1200' },
          overlay: { value: '1300' },
          modal: { value: '1400' },
          popover: { value: '1500' },
          toast: { value: '1600' },
          tooltip: { value: '1700' },
        },
      },
      semanticTokens: {
        colors: {
          // Semantic color tokens for theming
          bg: {
            canvas: {
              value: { base: '{colors.neutral.50}', _dark: '{colors.neutral.950}' },
            },
            surface: {
              value: { base: 'white', _dark: '{colors.neutral.900}' },
            },
            muted: {
              value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.800}' },
            },
            subtle: {
              value: { base: '{colors.neutral.200}', _dark: '{colors.neutral.700}' },
            },
          },
          text: {
            primary: {
              value: { base: '{colors.neutral.900}', _dark: '{colors.neutral.50}' },
            },
            secondary: {
              value: { base: '{colors.neutral.600}', _dark: '{colors.neutral.400}' },
            },
            tertiary: {
              value: { base: '{colors.neutral.500}', _dark: '{colors.neutral.500}' },
            },
            inverse: {
              value: { base: 'white', _dark: '{colors.neutral.900}' },
            },
          },
          border: {
            default: {
              value: { base: '{colors.neutral.200}', _dark: '{colors.neutral.700}' },
            },
            muted: {
              value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.800}' },
            },
            emphasis: {
              value: { base: '{colors.neutral.300}', _dark: '{colors.neutral.600}' },
            },
          },
          primary: {
            default: {
              value: { base: '{colors.brand.600}', _dark: '{colors.brand.500}' },
            },
            emphasis: {
              value: { base: '{colors.brand.700}', _dark: '{colors.brand.400}' },
            },
            text: {
              value: 'white',
            },
          },
        },
      },
    },
  },

  // Conditions for responsive design and color modes
  conditions: {
    extend: {
      light: '[data-theme="light"] &',
      dark: '[data-theme="dark"] &',
    },
  },

  // Global CSS
  globalCss: {
    body: {
      fontFamily: 'body',
      bg: 'bg.canvas',
      color: 'text.primary',
    },
  },

  // Patterns for common layout patterns
  patterns: {
    extend: {
      container: {
        description: 'A container that centers content and applies padding',
        properties: {
          maxWidth: { type: 'property', value: 'maxWidth' },
        },
        transform(props: any) {
          return {
            maxWidth: props.maxWidth || '1280px',
            mx: 'auto',
            px: { base: '4', md: '6', lg: '8' },
            width: '100%',
          };
        },
      },
    },
  },

  // Utilities
  utilities: {
    extend: {
      truncate: {
        className: 'truncate',
        values: { type: 'boolean' },
        transform: (value: boolean) => {
          if (!value) return {};
          return {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          };
        },
      },
    },
  },
});

